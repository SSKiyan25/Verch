<script setup lang="ts">
useHead({
  title: "Verch | Order Your Merchandise",
  meta: [
    {
      name: "Homepage of Verch",
      content: "E-commerce website for Verch",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/webp",
      href: "/logo-verch.webp",
    },
  ],
});
</script>
<template>
  <div class="bg-[#f6f6f6] min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
