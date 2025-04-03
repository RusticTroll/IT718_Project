<script setup lang="ts">
import '@aws-amplify/ui-vue/styles.css'

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper flex justify-end">
      <nav class="flex flex-col">
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
