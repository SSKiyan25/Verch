<template>
  <div class="flex min-h-screen flex-col">
    <header
      class="sticky top-0 z-40 w-full border-b bg-primary/90 text-primary-foreground backdrop-blur"
    >
      <UiContainer class="flex h-16 items-center justify-between sm:h-20">
        <div class="flex items-center gap-10">
          <NuxtLink to="/" class="flex items-center gap-3">
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img
              src="/logo-verch-2.png"
              fit="contain"
              alt="Company Logo"
              title="Company Logo"
              class="h-6 object-contain sm:h-8"
            />
            <span class="font-semibold sm:text-lg">Verch</span>
          </NuxtLink>
          <UiNavigationMenu as="nav" class="hidden items-center justify-start gap-8 sm:flex">
            <UiNavigationMenuList class="gap-2">
              <UiNavigationMenuItem>
                <UiNavigationMenuLink as-child>
                  <UiButton to="/" variant="ghost" size="sm" class="rounded-sm"> Home </UiButton>
                  <UiButton to="/stores" variant="ghost" size="sm" class="rounded-sm">
                    Stores
                  </UiButton>
                  <UiButton to="/products" variant="ghost" size="sm" class="rounded-sm">
                    Products
                  </UiButton>
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
              <UiNavigationMenuItem></UiNavigationMenuItem>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </div>
        <div class="sm:hidden">
          <UiSheet>
            <UiSheetTrigger as-child>
              <UiButton variant="ghost" size="icon-sm">
                <Icon name="lucide:menu" class="h-5 w-5" />
              </UiButton>
              <UiSheetContent class="w-[90%] p-0">
                <template #content>
                  <UiSheetTitle class="sr-only" title="Mobile menu" />
                  <UiSheetDescription class="sr-only" description="Mobile menu" />
                  <UiSheetX class="z-20" />

                  <UiScrollArea class="h-full p-5">
                    <div class="flex flex-col gap-2">
                      <!-- User -->
                      <span class="font-bold"> Main Menu </span>
                      <div class="flex flex-row items-center">
                        <Icon name="lucide:house" class="h-5 w-5" />
                        <UiButton variant="ghost" class="text-dm justify-start" to="/">
                          Home
                        </UiButton>
                      </div>

                      <div class="flex flex-row items-center">
                        <Icon name="lucide:user" class="h-5 w-5" />
                        <UiButton
                          variant="ghost"
                          class="justify-start text-sm"
                          :to="`/user/profile/${userData?.id}`"
                        >
                          My Profile
                        </UiButton>
                      </div>

                      <div class="flex flex-row items-center">
                        <UiChip
                          :class="cartNum > 0 ? 'bg-red-700 text-white' : ''"
                          size="lg"
                          :text="cartNum > 0 ? cartNum.toString() : ''"
                        >
                          <Icon name="lucide:shopping-cart" class="h-5 w-5" />
                        </UiChip>
                        <UiButton
                          variant="ghost"
                          class="justify-start text-sm"
                          :to="`/user/cart/${userData?.id}`"
                        >
                          Cart
                        </UiButton>
                      </div>

                      <div class="flex flex-row items-center">
                        <Icon name="lucide:shopping-basket" class="h-5 w-5" />
                        <UiButton
                          variant="ghost"
                          class="justify-start text-sm"
                          :to="`/user/orders/track-orders/${userData?.id}`"
                        >
                          My Orders
                        </UiButton>
                      </div>

                      <UiGradientDivider class="my-5" />
                      <!-- Organization -->
                      <span class="font-bold"> Organization Menu </span>
                      <div class="flex flex-row items-center">
                        <Icon name="lucide:building-2" class="h-5 w-5" />
                        <UiButton
                          variant="ghost"
                          class="justify-start text-sm"
                          :to="`/organization/products/${organizationID}`"
                        >
                          Manage Store
                        </UiButton>
                      </div>

                      <div class="flex flex-row items-center">
                        <Icon name="lucide:shopping-bag" class="h-5 w-5" />
                        <UiButton
                          variant="ghost"
                          class="justify-start text-sm"
                          :to="`/organization/orders/${organizationID}`"
                        >
                          Manage Orders
                        </UiButton>
                      </div>

                      <UiGradientDivider class="my-5" />
                      <UiButton v-if="!user" to="/login" class="text-secondary-foreground"
                        >Log in</UiButton
                      >
                      <UiButton v-else variant="destructive" @click="logout" class="text-secondary"
                        >Sign out</UiButton
                      >
                    </div>
                  </UiScrollArea>
                </template>
              </UiSheetContent>
            </UiSheetTrigger>
          </UiSheet>
        </div>
        <div class="hidden items-center gap-3 sm:flex">
          <template v-if="user">
            <UiButton :to="`/user/cart/${userData?.id}`" variant="ghost">
              <UiChip
                :class="cartNum > 0 ? 'bg-red-700 text-white' : ''"
                size="lg"
                :text="cartNum > 0 ? cartNum.toString() : ''"
              >
                <Icon name="lucide:shopping-cart" class="h-6 w-6 cursor-pointer hover:shadow-md" />
              </UiChip>
            </UiButton>
            <!-- User -->
            <UiNavigationMenu>
              <UiNavigationMenuList>
                <UiNavigationMenuItem>
                  <UiNavigationMenuTrigger
                    class="rounded-full bg-secondary text-secondary-foreground"
                  >
                    <div
                      class="flex flex-row items-center gap-1 rounded-full text-secondary-foreground"
                    >
                      <Icon name="lucide:user" class="h-6 w-6 cursor-pointer hover:shadow-md" />
                    </div>
                  </UiNavigationMenuTrigger>
                  <UiNavigationMenuContent>
                    <div class="flex w-[200px] flex-col justify-start px-4 py-4 text-sm">
                      <span></span>
                      <!-- User Profile -->
                      <NuxtLink :to="`/user/profile/${userData?.organizationID}`">
                        <div
                          class="flex flex-row items-center justify-between rounded-sm p-2 hover:bg-primary hover:text-primary-foreground"
                        >
                          <div class="flex items-center">
                            <Icon name="lucide:user" class="h-4 w-4" />
                            <div class="pl-2">Profile</div>
                          </div>

                          <Icon name="lucide:move-up-right" class="h-2 w-2 opacity-70" />
                        </div>
                      </NuxtLink>
                      <NuxtLink :to="`/user/orders/track-orders/${userData?.id}`">
                        <div
                          class="flex flex-row items-center justify-between rounded-sm p-2 hover:bg-primary hover:text-primary-foreground"
                        >
                          <NuxtLink :to="`/user/orders/track-orders/${userData?.organizationID}`">
                            <div class="flex items-center">
                              <Icon name="lucide:box" class="h-4 w-4" />
                              <div class="pl-2">Your Orders</div>
                            </div>
                          </NuxtLink>

                          <Icon name="lucide:move-up-right" class="h-2 w-2 opacity-70" />
                        </div>
                      </NuxtLink>
                      <NuxtLink :to="`/user/inbox/${userData?.organizationID}`">
                        <div
                          class="flex flex-row items-center justify-between rounded-sm p-2 hover:bg-primary hover:text-primary-foreground"
                        >
                          <div class="flex items-center">
                            <Icon name="lucide:inbox" class="h-4 w-4" />
                            <div class="pl-2">Inbox</div>
                          </div>

                          <Icon name="lucide:move-up-right" class="h-2 w-2 opacity-70" />
                        </div>
                      </NuxtLink>
                      <div v-if="userData && userData.hasOrganization">
                        <UiDivider class="py-2" />
                        <!-- Organization Dashboard -->
                        <NuxtLink :to="`/organization/products/${userData?.organizationID}`">
                          <div
                            class="flex flex-row items-center justify-start rounded-sm p-2 hover:bg-primary hover:text-primary-foreground"
                          >
                            <Icon name="lucide:store" class="h-4 w-4" />
                            <div class="pl-2">Manage Store</div>
                          </div>
                        </NuxtLink>
                        <NuxtLink :to="`/organization/orders/${userData?.organizationID}`">
                          <div
                            class="flex flex-row items-center justify-start rounded-sm p-2 hover:bg-primary hover:text-primary-foreground"
                          >
                            <!-- <UiChip class="bg-red-700 text-white" size="lg" text="7"> -->
                            <Icon name="lucide:shopping-bag" class="h-4 w-4" />
                            <!-- </UiChip> -->
                            <div class="pl-2">Manage Orders</div>
                          </div>
                        </NuxtLink>
                      </div>
                      <UiDivider class="py-2" />
                      <!-- Logout -->
                      <UiButton @click="logout" size="sm" class="flex w-full flex-row items-center">
                        <Icon name="lucide:log-out" class="h-4 w-4" />
                        Log Out
                      </UiButton>
                    </div>
                  </UiNavigationMenuContent>
                </UiNavigationMenuItem>
              </UiNavigationMenuList>
            </UiNavigationMenu>
          </template>
          <template v-else>
            <UiButton to="/login" variant="outline" size="sm" class="text-secondary-foreground">
              Log in
            </UiButton>
          </template>
        </div>
      </UiContainer>
    </header>
    <div class="mt-0">
      <slot />
    </div>
    <footer class="fixed bottom-0 left-0 right-0 border-t bg-white shadow-sm sm:hidden">
      <div class="flex w-full flex-row items-center justify-between">
        <template v-for="link in mobileLinks" :key="link.name" :to="link.to">
          <UiButton
            variant="ghost"
            class="flex h-16 flex-1 flex-col justify-center border-l py-2 text-sm text-muted-foreground"
            v-if="!(link.name === 'My Store' && !userData?.hasOrganization)"
          >
            <Icon :name="link.icon" class="h-5 w-5" />
            {{ link.name }}
          </UiButton>
        </template>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  // import { fetchOrganization } from "~/composables/organization/useOrganization";
  import { useFetchUserCart } from "~/composables/user/useFetchUserCart";
  import { signOut } from "firebase/auth";
  import { doc } from "firebase/firestore";
  import type { Account } from "~/types/models/Account";

  const user = useCurrentUser();
  const db = useFirestore();
  console.log("user", user);
  console.log("User iud", user.value?.uid);

  const cartNum = ref(0);
  const userId = ref<string | null>(null);

  //const orgData = await fetchOrganization();
  const userDocRef = computed(() => (user.value ? doc(db, "accounts", user.value.uid) : null));
  const userData = useDocument<Partial<Account>>(userDocRef) as Partial<Account> | undefined;
  console.log("userData in Navbar", userData);

  watch(
    () => user.value,
    (newUser) => {
      if (newUser) {
        const { userCart, fetchUserCart } = useFetchUserCart(newUser.uid);
        watch(
          () => userCart.value,
          (newCart) => {
            cartNum.value = newCart.length;
          },
          { immediate: true }
        );
        fetchUserCart();
      }
    },
    { immediate: true }
  );

  const auth = useFirebaseAuth();

  const logout = async () => {
    await signOut(auth!);
    navigateTo("/login");
  };

  const organizationID = computed(() => userData?.organizationID);

  const mobileLinks = computed(() => [
    { name: "Home", to: "/", icon: "lucide:house" },
    {
      name: "My Profile",
      to: user.value ? `/user/profile/${user.value.uid}` : "",
      icon: "lucide:user",
    },
    {
      name: "Cart",
      to: user.value ? `/user/cart/${user.value.uid}` : "",
      icon: "lucide:shopping-cart",
    },
    { name: "My Store", to: `/organization/products/${organizationID}`, icon: "lucide:store" },
  ]);
</script>
