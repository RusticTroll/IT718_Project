<script setup lang="ts">
import MagnifyingGlass from '@/components/SVGs/MagnifyingGlass.vue'
</script>

<template>
  <main class="flex flex-col">
    <div class="flex flex-row justify-center pt-4 pb-4 border-b-1 border-gray-500">
      <div class="border-1 border-gray-500 rounded-full h-12 w-116 focus:border-green-500 relative">
        <input class="pl-4 pr-12 focus:outline-none" />
        <MagnifyingGlass
          :size="36"
          class="absolute right-1.25 top-1.25 bg-gray-500 hover:bg-gray-400 rounded-full"
        />
      </div>
    </div>
    <div></div>
  </main>
</template>
