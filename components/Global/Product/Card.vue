<script setup lang="ts"></script>
<template>
  <div
    class="flex flex-col border rounded-sm hover:shadow-lg bg-white p-2 max-h-[32rem] max-w-[16rem]"
  >
    <div class="flex justify-center p-2 border-b">
      <div class="w-48 h-48 overflow-hidden">
        <img
          src="/assets/images/sample-product.png"
          alt="Product Image"
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
    </div>
    <div class="flex flex-col items-start pt-1 w-full">
      <span>P350-P380</span>
      <p class="truncate w-full pt-2">
        CS3 New T-Shirt asdasdasdasdasdasdasdASDASXASXASDASDAS
      </p>
      <div
        class="flex flex-row justify-between w-full text-[12px] pt-4 opacity-50"
      >
        <span>0 sold</span>
        <span>Available</span>
      </div>
    </div>
  </div>
</template>
