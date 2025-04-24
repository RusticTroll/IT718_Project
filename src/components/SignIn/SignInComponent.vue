<script setup lang="ts">
import { signIn } from 'aws-amplify/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

async function handleSignIn(event: Event) {
  event.preventDefault()

  const { nextStep } = await signIn({
    username: email.value,
    password: password.value,
  })

  if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
    router.push({ name: 'verify_totp' })
  } else if (nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP') {
    const totpSetupDetail = nextStep.totpSetupDetails

    let setupUri = 'otpauth://totp/Xitter%3A'
    setupUri += encodeURIComponent(email.value)
    setupUri += '?secret=' + totpSetupDetail.sharedSecret
    setupUri += '&issuer=Xitter'

    router.push({
      name: 'setup_totp',
      state: { setupUri },
    })
  } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
    router.push({ name: 'confirm_sign_up', state: { email_to_confirm: email.value } })
  } else {
    router.push({ name: 'profile' })
  }
}
</script>

<template>
  <div class="flex justify-center">
    <form class="flex flex-col w-[75%] gap-2 p-4" @submit="handleSignIn">
      <h1>Sign In</h1>
      <input name="email" type="text" placeholder="Email" required v-model="email" />
      <input name="password" type="password" placeholder="Password" required v-model="password" />
      <input type="submit" value="Sign In" />
    </form>
  </div>
</template>

<style scoped>
form h1 {
  font-weight: bold;
  font-size: 20pt;
}
</style>
