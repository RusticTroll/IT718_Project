<script setup lang="ts">
import { useRouter } from 'vue-router'
import { generateClient } from 'aws-amplify/api'

import type { Schema } from '@backend/data/resource'
import { useUserStore } from '@/stores/user'
import NewXitWritter from '@/components/NewXitWritter.vue'

const client = generateClient<Schema>()
const user = useUserStore()
const router = useRouter()

async function post_xit(text: string, image: File | null) {
  const { errors, data: new_xit } = await client.models.Xit.create({
    text,
    user_id: user.user!.userId,
  })

  if (errors) {
    console.log(errors)
  }

  router.push({ name: 'single_xit', params: { id: new_xit!.id } })
}
</script>

<template>
  <main class="flex flex-col p-2 h-full">
    <NewXitWritter @post_xit="post_xit" />
  </main>
</template>
