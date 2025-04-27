<script setup lang="ts">
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '@backend/data/resource'

const props = defineProps({
  id: String,
})

const client = generateClient<Schema>()
const { data: xit } = await client.models.Xit.get({ id: props.id! })
const { data: xit_poster } = await xit!.user()
</script>

<template>
  <main class="flex flex-col p-2 h-full">
    <h1 class="font-bold">
      {{ xit_poster!.username }} posted at {{ new Date(xit!.createdAt!).toLocaleString() }}
    </h1>
    <p>{{ xit!.text }}</p>
  </main>
</template>
