<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { confirmSignUp, autoSignIn } from 'aws-amplify/auth'

const router = useRouter()

const email = <string>history.state.email_to_confirm
if (email === undefined) {
  router.push({ name: 'signin' })
}
const error_message = ref('')
const code = ref('')

async function confirm_signup() {
  try {
    await confirmSignUp({
      username: email,
      confirmationCode: code.value,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    error_message.value = error.message
    return
  }

  setup_totp()
}

async function setup_totp() {
  const { nextStep } = await autoSignIn()
  if (nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP') {
    const totpSetupDetail = nextStep.totpSetupDetails

    let setupUri = 'otpauth://totp/Xitter%3A'
    setupUri += encodeURIComponent(email)
    setupUri += '?secret=' + totpSetupDetail.sharedSecret
    setupUri += '&issuer=Xitter'

    router.push({
      name: 'setup_totp',
      state: { setupUri },
    })
  }
}
</script>

<template>
  <div class="flex flex-col place-content-center h-full w-3/4 m-auto">
    <h1 class="text-2xl font-bold">Confirm Email</h1>
    <p>
      A code has been sent to {{ email }}.<br />
      You know what to do.
    </p>
    <input placeholder="Confirmation Code" v-model="code" />
    <input type="submit" @click="confirm_signup" value="Confirm" />
    <p class="text-red-500">{{ error_message }}</p>
  </div>
</template>
