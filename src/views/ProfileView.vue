<script setup lang="ts">
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = await getCurrentUser()
const userAttributes = await fetchUserAttributes()

async function sign_out() {
  await signOut()
  router.push({ name: 'signin' })
}
</script>

<template>
  <h1>Hi, {{ userAttributes.preferred_username }}! ({{ user!.userId }})</h1>
  <button @click="sign_out">Sign out</button>
</template>
