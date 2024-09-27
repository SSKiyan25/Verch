<template>
  <div class="flex flex-col pt-8 pl-4">
    <div class="flex flex-row items-center gap-2 pb-1">
      <IconsPriceRange class="h-auto w-5" />
      <span class="font-semibold text-lg">Price Range</span>
    </div>
    <div class="flex flex-row items-center px-4 pt-2">
      <input
        type="number"
        class="w-1/2 border-b border-gray-300 focus:outline-none text-sm p-2 focus:border-gray-500 rounded-sm"
        placeholder="Min"
      />
      <span class="mx-2">-</span>
      <input
        type="number"
        class="w-1/2 border-b border-gray-300 focus:outline-none text-sm p-2 focus:border-gray-500 rounded-sm"
        placeholder="Max"
      />
    </div>
    <div class="flex flex-row items-center px-4 pt-4">
      <button
        class="px-4 py-2 w-full rounded-sm bg-[#FDC530] text-sm text-[#ffff] tracking-wide font-medium"
      >
        Apply
      </button>
    </div>
  </div>
</template>
