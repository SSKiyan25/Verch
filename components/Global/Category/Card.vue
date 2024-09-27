<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
}>();
</script>
<template>
  <div
    class="flex flex-col justify-center items-center border w-[5rem] h-20 md:w-[9.9rem] md:h-40 hover:shadow-lg hover:border-2 cursor-pointer bg-white"
  >
    <p>{{ props.icon }}</p>
    <p class="hidden md:block">{{ props.title }}</p>
  </div>
</template>
