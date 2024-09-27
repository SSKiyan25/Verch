<template>
  <div class="h-screen mt-20 md:mt-24">
    <div class="flex flex-col w-full px-2 md:px-12 py-8 gap-4 bg-[#f6f6f6]">
      <div class="min-h-24">
        <div class="flex flex-col">
          <GlobalCategoryContainer />
        </div>
      </div>
      <div class="min-h-24">
        <div class="flex flex-col">
          <GlobalPromotionContainer />
        </div>
      </div>
      <div class="flex flex-col md:grid md:grid-cols-10 min-h-96 md:gap-8">
        <div class="md:flex flex-col md:col-span-2 hidden">
          <GlobalFilterContainer />
        </div>
        <div class="md:col-span-8">
          <GlobalProductContainer />
        </div>
      </div>
    </div>
  </div>
</template>
