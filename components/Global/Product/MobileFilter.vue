<script setup lang="ts"></script>
<template>
  <div class="flex flex-col w-full">
    <div
      class="grid grid-cols-4 justify-evenly items-center text-nowrap text-center w-full"
    >
      <div class="border-b pb-2 gap-1 border-r">
        <span class="text-sm font-medium">Popular</span>
      </div>
      <div class="border-b pb-2 gap-1 border-r">
        <span class="text-sm font-medium">Latest</span>
      </div>
      <div class="border-b pb-2 gap-1 border-r">
        <span class="text-sm font-medium">Top Sales</span>
      </div>
      <div class="flex flex-row items-center border-b pb-2 gap-1 pl-3">
        <span class="text-sm font-medium">Pricing</span>
        <span><IconsArrows class="w-4 opacity-75" /></span>
      </div>
    </div>
    <div class="pt-3">
      <GlobalProductMobileSubFilter />
    </div>
  </div>
</template>
