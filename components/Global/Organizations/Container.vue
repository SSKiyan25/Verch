<script setup lang="ts">
const category: { icon: string; title: string }[] = [
  { icon: "icon", title: "CS3" },
  { icon: "icon", title: "CET-SSC" },
];
</script>
<template>
  <div class="bg-white pb-6">
    <div class="p-4">
      <h2 class="uppercase font-semibold text-gray-800">Organizations</h2>
    </div>
    <div
      class="flex flex-row flex-wrap items-center justify-center w-full p-2 mt-3 gap-2"
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
