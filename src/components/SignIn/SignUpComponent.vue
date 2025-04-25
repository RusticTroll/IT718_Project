<script setup lang="ts">
import { ref } from 'vue'
import { signUp } from 'aws-amplify/auth'
import { useRouter } from 'vue-router'

const errorMessage = ref('')

const username = ref('')
const email = ref('')
const confirm_email = ref('')
const password = ref('')
const confirm_password = ref('')

const router = useRouter()

async function handleSignUp(event: Event) {
  event.preventDefault()

  if (!validateInputs()) {
    return
  }

  try {
    await signUp({
      username: email.value,
      password: password.value,
      options: {
        userAttributes: {
          email: email.value,
          preferred_username: username.value,
        },
        autoSignIn: {
          authFlowType: 'USER_SRP_AUTH',
        },
      },
    })

    router.push({ name: 'confirm_sign_up', state: { email_to_confirm: email.value } })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

function validateInputs() {
  const emailValidator = RegExp('.+@.+\..+')

  if (!emailValidator.test(email.value)) {
    errorMessage.value = 'Invalid Email!'
    return false
  } else if (email.value != confirm_email.value) {
    errorMessage.value = 'Emails do not match!'
    return false
  } else if (password.value != confirm_password.value) {
    errorMessage.value = 'Passwords do not match!'
    return false
  }

  errorMessage.value = ''
  return true
}
</script>

<template>
  <div class="flex justify-center">
    <form id="signUpForm" class="flex flex-col w-[75%] gap-2 p-4" @submit="handleSignUp">
      <h1 class="text-xl font-bold">Sign Up</h1>
      <input name="username" type="text" placeholder="Username" required v-model="username" />
      <input name="email" type="text" placeholder="Email" required v-model="email" />
      <input
        name="confirm_email"
        type="text"
        placeholder="Confirm Email"
        required
        v-model="confirm_email"
      />
      <input name="password" type="password" placeholder="Password" required v-model="password" />
      <input
        name="confirm_password"
        type="password"
        placeholder="Password"
        required
        v-model="confirm_password"
      />
      <input type="submit" value="Sign Up" />
      <p v-if="errorMessage !== ''" class="text-red-500">{{ errorMessage }}</p>
    </form>
  </div>
</template>
