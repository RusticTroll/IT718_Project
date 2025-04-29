<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { generateClient } from 'aws-amplify/api'

import type { Schema } from '@backend/data/resource'
import { useUserStore } from '@/stores/user'
import ToastComponent from '@/components/ToastComponent.vue'

const xit_text = ref('')

const client = generateClient<Schema>()
const user = useUserStore()
const router = useRouter()

const warning_toast = useTemplateRef('warning')
const character_max = 269

async function post_xit() {
  if (xit_text.value.length > character_max || xit_text.value.length == 0) {
    warning_toast.value?.toggle_shown()
    return
  }

  const { errors, data: new_xit } = await client.models.Xit.create({
    text: xit_text.value,
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
    <textarea class="flex-grow mb-2" placeholder="Let the Xit flow out here" v-model="xit_text" />
    <div class="flex flex-row">
      <button class="flex-grow mr-2" @click="post_xit">Xit Yourself</button>
      <span class="flex-none self-center mr-1">{{ xit_text.length }}/{{ character_max }}</span>
    </div>
    <ToastComponent ref="warning">
      <template v-slot:title>
        <span v-if="xit_text.length == 0">Empty</span>
        <span v-if="xit_text.length != 0">Too Long</span>
      </template>
      <template v-slot:content>
        <p v-if="xit_text.length == 0">Your Xit cannot be empty.</p>
        <p v-if="xit_text.length != 0">
          Your Xit must be less than {{ character_max }} characters.
        </p>
      </template>
    </ToastComponent>
  </main>
</template>
