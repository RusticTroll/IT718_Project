<script setup lang="ts">
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth'

const user = await getCurrentUser().catch(() => {
  window.location.href = '/signin'
})
const userAttributes = await fetchUserAttributes()
</script>

<template>
  <h1>Hi, {{ userAttributes.preferred_username }}! ({{ user.userId }})</h1>
</template>
