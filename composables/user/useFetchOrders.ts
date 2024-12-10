import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import type { Order, OrderItem } from "~/types/models/Order";
import type { Product, Variation } from "~/types/models/Product";

// Define a new type that extends OrderItem to include additional properties
export type ExtendedOrderItem = OrderItem &
  Partial<{
    productDetails: Product | null;
    packageDetails: any | null;
    variationDetails: Variation | null;
  }>;

export const useFetchOrders = () => {
  const db = useFirestore();

  // Helper function to fetch product details
  const fetchProductDetails = async (productID: string): Promise<Product | null> => {
    const productRef = doc(db, "products", productID);
    const productDoc = await getDoc(productRef);
    return productDoc.exists() ? (productDoc.data() as Product) : null;
  };

  // Helper function to fetch package details
  const fetchPackageDetails = async (packageID: string): Promise<any | null> => {
    const packageRef = doc(db, "packages", packageID);
    const packageDoc = await getDoc(packageRef);
    return packageDoc.exists() ? packageDoc.data() : null;
  };

  // Helper function to fetch variation details from the sub-collection of the product
  const fetchVariationDetails = async (
    productID: string,
    variationID: string
  ): Promise<Variation | null> => {
    const variationRef = doc(db, `products/${productID}/variations`, variationID);
    const variationDoc = await getDoc(variationRef);
    return variationDoc.exists() ? (variationDoc.data() as Variation) : null;
  };

  // Helper function to fetch order items for a given order ID
  const fetchOrderItems = async (orderID: string): Promise<ExtendedOrderItem[]> => {
    const orderItemsRef = collection(db, `orders/${orderID}/orderItems`);
    const querySnapshot = await getDocs(orderItemsRef);
    const orderItems: ExtendedOrderItem[] = [];
    for (const doc of querySnapshot.docs) {
      const orderItem = doc.data() as OrderItem;
      const productDetails = await fetchProductDetails(orderItem.productID);
      const packageDetails = orderItem.isPackage
        ? await fetchPackageDetails(orderItem.packageID)
        : null;
      const variationDetails = await fetchVariationDetails(
        orderItem.productID,
        orderItem.variationID
      );
      orderItems.push({
        ...orderItem,
        productDetails,
        packageDetails,
        variationDetails,
      });
    }
    return orderItems;
  };

  // 1. Fetch the user order according to the passed userID parameter
  const fetchUserOrders = async (
    userID: string
  ): Promise<(Order & { id: string; orderItems: OrderItem[] })[]> => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("buyerID", "==", userID));
    const querySnapshot = await getDocs(q);
    const orders: (Order & { id: string; orderItems: OrderItem[] })[] = [];
    for (const doc of querySnapshot.docs) {
      const order = doc.data() as Order;
      const orderItems = await fetchOrderItems(doc.id);
      orders.push({ ...order, id: doc.id, orderItems });
    }
    return orders;
  };

  // 2. Fetch the latest pending order for the user
  const fetchLatestOrder = async (
    userID: string
  ): Promise<(Order & { id: string; orderItems: OrderItem[] }) | null> => {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("buyerID", "==", userID),
      orderBy("dateOrdered", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const order = doc.data() as Order;
      const orderItems = await fetchOrderItems(doc.id);
      return { ...order, id: doc.id, orderItems };
    }
    return null;
  };

  // 3. Fetch orders for the user with filters for orderStatus, paymentStatus, and limit
  const fetchOrders = async (
    userID: string,
    orderStatus: string = "all",
    paymentStatus: string = "",
    limitNumber: number = 10
  ): Promise<(Order & { id: string; orderItems: OrderItem[] })[]> => {
    const ordersRef = collection(db, "orders");
    console.log("limitNumber:", limitNumber);
    let q = query(ordersRef, where("buyerID", "==", userID), limit(limitNumber));

    if (orderStatus !== "all") {
      q = query(q, where("orderStatus", "==", orderStatus));
    }

    if (paymentStatus !== "") {
      q = query(q, where("paymentStatus", "==", paymentStatus));
    }

    const querySnapshot = await getDocs(q);
    console.log("querySnapshot size:", querySnapshot.size);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }

    const orders: (Order & { id: string; orderItems: OrderItem[] })[] = [];
    for (const doc of querySnapshot.docs) {
      const order = doc.data() as Order;
      const orderItems = await fetchOrderItems(doc.id);
      orders.push({ ...order, id: doc.id, orderItems });
    }
    return orders;
  };

  // 4. Cancel an order by changing its status and adding remarks
  const cancelOrder = async (orderID: string, remarks: string): Promise<void> => {
    if (!remarks) {
      throw new Error("Remarks is required to cancel an order.");
    }

    const orderRef = doc(db, "orders", orderID);
    const orderDoc = await getDoc(orderRef);
    if (!orderDoc.exists()) {
      throw new Error("Order not found");
    }

    const order = orderDoc.data() as Order;
    const orderItems = await fetchOrderItems(orderID);

    const batch = writeBatch(db);

    // Update order status and remarks
    batch.update(orderRef, {
      orderStatus: "cancelled",
      remarks: remarks,
    });

    // Update variation details and add stock logs
    for (const item of orderItems) {
      const variationRef = doc(db, `products/${item.productID}/variations`, item.variationID);
      const variationDoc = await getDoc(variationRef);
      if (!variationDoc.exists()) {
        continue;
      }

      const variation = variationDoc.data() as Variation;
      const updatedPendingOrders = variation.reservedStocks - item.quantity;
      const updatedCancelledOrders = variation.cancelledOrders + item.quantity;
      const updatedRemainingStocks = variation.remainingStocks + item.quantity;

      batch.update(variationRef, {
        pendingOrders: updatedPendingOrders,
        cancelledOrders: updatedCancelledOrders,
        remainingStocks: updatedRemainingStocks,
        lastStockUpdate: Date.now(),
        lastModified: Date.now(),
      });

      if (!item.isPreOrder) {
        const stockLogRef = doc(collection(variationRef, "stocksLogs"));
        batch.set(stockLogRef, {
          variationID: item.variationID,
          quantity: item.quantity,
          action: "cancelled",
          remarks: remarks,
          dateCreated: Date.now(),
        });
      }
    }

    await batch.commit();
  };

  return {
    fetchUserOrders,
    fetchLatestOrder,
    fetchOrders,
    cancelOrder,
    fetchOrderItems,
  };
};
