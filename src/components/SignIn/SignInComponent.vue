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
  } else {
    router.push({ name: 'profile' })
  }
}
</script>

<template>
  <div class="flex justify-center">
    <form class="flex flex-col w-[75%] gap-2 p-4" @submit="handleSignIn">
      <h1>Sign In</h1>
      <input
        name="email"
        type="text"
        placeholder="Email"
        required
        class="rounded-full p-2"
        v-model="email"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        class="rounded-full p-2"
        v-model="password"
      />
      <input type="submit" value="Sign In" class="rounded-full p-2" />
    </form>
  </div>
</template>

<style scoped>
input {
  border: 1px gray solid;
}

form h1 {
  font-weight: bold;
  font-size: 20pt;
}
</style>
