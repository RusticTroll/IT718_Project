<script setup lang="ts">
defineProps<{
  id: string
  text: string
  createdAt: string | undefined
  user: {
    username: string
  }
}>()
</script>

<template>
  <h1 class="font-bold">
    {{ user.username }} posted at {{ new Date(createdAt!).toLocaleString() }}
  </h1>
  <p>{{ text }}</p>
</template>
