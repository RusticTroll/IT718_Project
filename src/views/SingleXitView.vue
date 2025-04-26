<script setup lang="ts">
import { defineProps } from 'vue'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '@backend/data/resource'

const props = defineProps({
  id: String
})

const client = generateClient<Schema>()
const xit = await client.models.Xit.get({id: props.id!})
</script>

<template>
  <main class="flex flex-col p-2 h-full">
    <h1>{{ xit.data!.username }}</h1>
    <p>{{ xit.data!.text }}</p>
  </main>
</template>
