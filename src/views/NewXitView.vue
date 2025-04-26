<script setup lang="ts">
import { ref } from 'vue'
import { generateClient } from 'aws-amplify/api'

import type { Schema } from '@backend/data/resource'
import { useUserStore } from '@/stores/user'

const xit_text = ref('')

const client = generateClient<Schema>()
const user = useUserStore()

async function post_xit() {
  const { errors, data: new_xit } = await client.models.Xit.create({
    text: xit_text.value,
    username: user.user_attributes!.preferred_username!
  })
}
</script>

<template>
  <main class="flex flex-col p-2 h-full">
    <textarea class="flex-grow mb-2" placeholder="Let the Xit flow out here" v-model="xit_text" />
    <button class="flex-none" @click="post_xit">Xit Yourself</button>
  </main>
</template>
