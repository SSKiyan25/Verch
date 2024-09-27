<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
}>();
</script>
<template>
  <div
    class="flex flex-col justify-center items-center border w-[9.9rem] h-40 hover:shadow-lg hover:border-2 cursor-pointer bg-white"
  >
    <p>{{ props.icon }}</p>
    <p>{{ props.title }}</p>
  </div>
</template>
