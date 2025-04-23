<script setup lang="ts">
import { ref } from 'vue'
import { confirmSignIn } from 'aws-amplify/auth'

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

  window.location.href = '/profile'
}
</script>

<template>
  <h1>Verify with TOTP code</h1>
  <input name="code" type="text" placeholder="TOTP Code" v-model="totp_code" />
  <button @click="verify_totp">Verify</button>
  <p class="text-red-500">{{ error_message }}</p>
</template>
