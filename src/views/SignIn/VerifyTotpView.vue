<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { confirmSignIn } from 'aws-amplify/auth'

const router = useRouter()

const totp_code = ref('')
const error_message = ref('')

async function verify_totp() {
  try {
    await confirmSignIn({
      challengeResponse: totp_code.value,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    error_message.value = error.message
    return
  }

  router.push({ name: 'home' })
}
</script>

<template>
  <div class="flex flex-col place-content-center h-full w-3/4 m-auto">
    <h1 class="text-2xl font-bold text-center">Verify with TOTP code</h1>
    <input name="code" type="text" placeholder="TOTP Code" v-model="totp_code" />
    <button @click="verify_totp">Verify</button>
    <p class="text-red-500">{{ error_message }}</p>
  </div>
</template>

<style scoped>
.flex * {
  margin: 0.25rem;
}
</style>
