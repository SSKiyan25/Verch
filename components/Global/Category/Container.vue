<script setup lang="ts">
const category: { icon: string; title: string }[] = [
  { icon: "icon", title: "T-Shirt" },
  { icon: "icon", title: "Polo-Shirt" },
  { icon: "icon", title: "Lanyard" },
  { icon: "icon", title: "Hoodie" },
  { icon: "icon", title: "Fan" },
  { icon: "icon", title: "Stickers" },
  { icon: "icon", title: "Other" },
];
</script>
<template>
  <div class="bg-white pb-3 md:pb-6">
    <div class="p-4">
      <h2 class="uppercase font-semibold text-gray-800">Categories</h2>
    </div>
    <div
      class="flex flex-row flex-wrap items-center justify-center w-full p-2 mt-0 md:mt-3 gap-1 md:gap-2"
    >
      <GlobalCategoryCard
        v-for="(item, index) in category"
        :key="index"
        :icon="item.icon"
        :title="item.title"
      />
    </div>
  </div>
</template>
