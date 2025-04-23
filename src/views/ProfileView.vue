<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = useUserStore()

async function sign_out() {
  await signOut()
  router.push({ name: 'signin' })
}
</script>

<template>
  <h1>Hi, {{ user.user_attributes!.preferred_username }}! ({{ user.user!.userId }})</h1>
  <button @click="sign_out">Sign out</button>
</template>
