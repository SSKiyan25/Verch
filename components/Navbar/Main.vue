<script setup lang="ts">
import { Input } from "@/components/ui/input";
</script>
<template>
  <!-- ========== HEADER ========== -->
  <header
    class="text-white border-b border-[#FDC530] border-opacity-50 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full font-sans"
  >
    <nav
      class="fixed bg-[#17321A] min-h-[4.5rem] w-full flex items-center justify-between md:gap-3 mx-auto px-4 sm:px-16 py-2"
    >
      <!-- Logo w/ Collapse Button -->
      <div class="flex flex-row items-center justify-between">
        <img src="/logo-verch-2.png" alt="logo" class="w-8 sm:w-10 h-auto" />
        <a
          class="flex-none font-semibold text-2xl hidden sm:block text-white tracking-wider uppercase focus:outline-none focus:opacity-80 pl-2 pt-2"
          href="#"
          aria-label="Brand"
          >Verch</a
        >
      </div>
      <!-- End Logo w/ Collapse Button -->

      <!-- Collapse -->
      <div
        class="overflow-hidden transition-all duration-300 basis-full grow"
        aria-labelledby="hs-header-classic-collapse"
      >
        <div
          class="py-2 md:py-0 flex flex-row items-center justify-end gap-0.5"
        >
          <div
            class="relative w-full max-w-[15rem] sm:max-w-3xl items-center pr-2 sm:pr-5"
          >
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10 rounded-sm h-8 py-5 text-[10px] sm:text-sm"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center pl-2 opacity-70"
            >
              <IconsSearch />
            </span>
          </div>
          <!-- Button Group -->
          <div
            class="relative flex flex-row flex-wrap items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2"
          >
            <a
              class="p-2 w-full flex items-center text-sm sm:text-md text-white hover:text-gray-500 focus:outline-none focus:text-gray-500"
              href="#"
            >
              <svg
                class="shrink-0 size-4 hidden me-1 md:me-2 md:block"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Log in
            </a>
          </div>
          <!-- End Button Group -->
        </div>
      </div>
      <!-- End Collapse -->
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
</template>
