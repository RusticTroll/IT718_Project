<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <nav>
      <RouterLink to="/new">New</RouterLink>
      <RouterLink to="/following">Following</RouterLink>
    </nav>

    <RouterView />
  </main>
</template>
