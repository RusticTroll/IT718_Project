<script setup lang="ts">
defineProps<{
  username: string,
  text: string,
  id: string | null,
  owner: string | null,
  createdAt: string | null,
  updatedAt: string,
  parentId: string | null
}>()

</script>

<template>
  <h1 class="font-bold">{{ username }} posted at {{ new Date(createdAt!).toLocaleString() }}</h1>
  <p>{{ text }}</p>
</template>
