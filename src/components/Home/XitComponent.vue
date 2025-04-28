<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
  text: string
  createdAt: string | undefined
  user: {
    username: string
  }
}>()

const router = useRouter()

async function open_as_single() {
  router.push({name: 'single_xit', params: {id: props.id}})
}
</script>

<template>
  <button style="border: 0; border-radius: 0.25rem;" class="w-full text-left hover:bg-gray-700" @click="open_as_single">
    <h1 class="font-bold">
      {{ user.username }} posted at {{ new Date(createdAt!).toLocaleString() }}
    </h1>
    <p>{{ text }}</p>
  </button>
</template>
