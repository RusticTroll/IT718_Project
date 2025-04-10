<script setup lang="ts">
import '@aws-amplify/ui-vue/styles.css'

import { RouterLink, RouterView } from 'vue-router'
import MagnifyingGlass from './components/SVGs/MagnifyingGlass.vue'
import HomeImage from './components/SVGs/HomeImage.vue'
</script>

<template>
  <nav
    class="md:w-32 md:min-w-32 flex-1 flex flex-col justify-items-stretch md:text-end not-md:flex-row not-md:text-center not-md:w-auto not-md:flex-none text-lg"
  >
    <RouterLink
      v-if="$route.path !== '/signin'"
      to="/"
      class="content-center h-12 not-md:flex-1 flex items-center not-md:justify-center"
    >
      <HomeImage :size="48" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Home</span>
    </RouterLink>
    <RouterLink
      v-if="$route.path !== '/signin'"
      to="/search"
      class="content-center h-12 not-md:flex-1 flex items-center not-md:justify-center"
    >
      <MagnifyingGlass :size="48" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Search</span>
    </RouterLink>
  </nav>

  <RouterView class="flex-none md:w-144 not-md:w-full not-md:flex-grow border-1 border-gray-500" />

  <div class="w-16 flex-1 not-md:max-h-0" />
</template>

<style scoped>
.router-link-active span {
  font-weight: bold;
}
</style>
