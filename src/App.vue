<script setup lang="ts">
import '@aws-amplify/ui-vue/styles.css'

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex">
    <div class="wrapper flex-none">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="w-50" />
</template>

<style scoped></style>
