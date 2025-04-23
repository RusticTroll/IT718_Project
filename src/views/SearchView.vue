<script setup lang="ts">
import MagnifyingGlass from '@/components/SVGs/MagnifyingGlass.vue'
import { ref } from 'vue'

const focused = ref(false)

const search_term = ref('')
</script>

<template>
  <main class="flex flex-col">
    <div class="flex flex-row justify-center pt-4 pb-4">
      <div
        class="border-1 border-gray-500 rounded-full h-12 w-3/4 relative transition-colors"
        :class="{ 'border-green-500': focused }"
      >
        <input
          class="focus:outline-none w-[90%] h-full"
          v-model="search_term"
          v-on:focusin="focused = true"
          v-on:focusout="focused = false"
        />
        <MagnifyingGlass
          :size="'36'"
          class="absolute right-1.25 top-1.25 bg-gray-500 hover:bg-gray-400 rounded-full"
        />
      </div>
    </div>
    <!-- Future content div -->
    <div></div>
  </main>
</template>

<style scoped>
input {
  border: none;
}
</style>
