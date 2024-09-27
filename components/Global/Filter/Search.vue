<script setup lang="ts">
const category: { title: string }[] = [
  { title: "T-Shirt" },
  { title: "Polo-Shirt" },
  { title: "Lanyard" },
  { title: "Hoodie" },
  { title: "Fan" },
  { title: "Stickers" },
  { title: "Other" },
];
</script>
<template>
  <div class="flex flex-col">
    <div class="flex flex-col pt-8 pl-4">
      <div class="flex flex-row gap-2 pb-1">
        <IconsFilter class="h-auto w-4" />
        <span class="font-semibold text-lg">Search Filter Combo</span>
      </div>
      <div class="flex flex-col pl-7 pt-1">
        <div
          v-for="(item, index) in category"
          :key="index"
          class="pt-2 items-center flex"
        >
          <input type="checkbox" class="mr-1" />
          <span class="font-semibold text-sm opacity-70">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
