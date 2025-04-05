<script setup lang="ts">
import '@aws-amplify/ui-vue/styles.css'

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="w-32 min-w-32 flex-1 flex flex-col justify-items-stretch text-end">
    <RouterLink to="/" class="content-center h-12">
      <span class="align-middle pr-2">Home</span>
    </RouterLink>
    <RouterLink to="/search" class="content-center h-12 relative">
      <span class="align-middle pr-2">Search</span>
    </RouterLink>
  </nav>

  <RouterView class="flex-none w-144 border-1 border-gray-500"/>

  <div class="w-16 min-w-0 flex-1"/>
</template>

<style scoped>
.router-link-active span {
  font-weight: bold;
}
</style>
