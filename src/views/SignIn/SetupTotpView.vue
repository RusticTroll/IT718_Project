<script setup lang="ts">
import { ref } from 'vue'
import StyledQRCode from '@/components/StyledQRCode.vue'
import { confirmSignIn } from 'aws-amplify/auth'

const setup_uri = <string>history.state.setupUri
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
  <div class="flex flex-col place-content-center h-full w-3/4 m-auto">
    <h1 class="text-2xl font-bold text-center">Set Up TOTP</h1>
    <p class="text-center">
      Add the following TOTP to your authenticator app<br />Then type in the resulting code
    </p>
    <StyledQRCode
      v-bind="{
        data: setup_uri,
        width: 200,
        height: 200,
        qrOptions: { errorCorrectionLevel: 'L' },
        backgroundOptions: { color: '#FFFFFF' },
      }"
    />
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
