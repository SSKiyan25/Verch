<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
</script>
<template>
  <div class="">
    <div
      class="mt-4 md:mt-8 p-4 border-b flex flex-row justify-between items-center bg-white rounded-sm"
    >
      <div class="md:flex flex-row items-center gap-2 hidden">
        <h3 class="font-semibold text-md text-nowrap pr-4 pb-2">Sort by</h3>
        <button
          class="px-4 py-2 rounded-sm bg-[#FDC530] text-sm text-[#ffff] tracking-wide font-medium"
        >
          Popular
        </button>
        <button class="px-4 py-2 rounded-sm bg-stone-200 text-sm text-black">
          Latest
        </button>
        <button
          class="px-6 py-2 rounded-sm bg-stone-200 text-sm text-nowrap text-black"
        >
          Top Sales
        </button>
        <Select class="bg-[#f0f0f0]">
          <SelectTrigger>
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="md:hidden flex w-full">
        <GlobalProductMobileFilter />
      </div>
      <div class="hidden md:flex flex-row items-center">
        <span class="pr-2">1/10</span>
        <button class="p-2 border bg-stone-200 opacity-50 cursor-not-allowed">
          <IconsChevronLeft />
        </button>
        <button class="p-2 border bg-white"><IconsChevronRight /></button>
      </div>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-start px-4 pt-4">
      <GlobalProductCard />
    </div>
  </div>
</template>
