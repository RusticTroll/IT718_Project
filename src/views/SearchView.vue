<script setup lang="ts">
import MagnifyingGlass from '@/components/SVGs/MagnifyingGlass.vue';
</script>

<template>
  <main class="">
    <div class="flex flex-row justify-center pt-4 pb-4 relative border-b-1 border-gray-500">
      <input class="border-1 border-gray-500 rounded-full h-13 w-116 pl-4 pr-12 focus:outline-none focus:border-green-500"/>
      <MagnifyingGlass :size="36" class="absolute right-8 top-6 bg-gray-500 hover:bg-gray-400 rounded-full"/>
    </div>
  </main>

</template>
