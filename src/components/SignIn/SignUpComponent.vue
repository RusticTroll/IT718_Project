<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth'
import ToastComponent from '../ToastComponent.vue'

const errorMessage = ref('')
const confirmed_email = ref('')

async function handleSignUp(event: Event) {
  event.preventDefault()

  console.log('Handling sign up!')

  const form = document.querySelector('form')!
  const email = (<HTMLInputElement>form.elements.namedItem('email')).value
  const confirmEmail = (<HTMLInputElement>form.elements.namedItem('confirm_email')).value
  const password = (<HTMLInputElement>form.elements.namedItem('password')).value
  const confirmPassword = (<HTMLInputElement>form.elements.namedItem('confirm_password')).value

  if (!validateInputs(email, confirmEmail, password, confirmPassword)) {
    return
  }

  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email,
          preferred_username: (<HTMLInputElement>form.elements.namedItem('username')).value,
        },
      },
    })

    console.log('Complete?: %s', isSignUpComplete.toString())
    console.log('User ID: %s', userId)
    console.log('Next step: %s', nextStep.signUpStep)

    confirmed_email.value = email

    toast.value?.toggle_shown()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

function validateInputs(
  email: string,
  confirmEmail: string,
  password: string,
  confirmPassword: string,
) {
  const emailValidator = RegExp('.+@.+\..+')

  console.log('Email: %s', email)
  console.log('CEmail: %s', confirmEmail)
  console.log('Pass: %s', password)
  console.log('CPass: %s', confirmPassword)

  if (!emailValidator.test(email)) {
    errorMessage.value = 'Invalid Email!'
    return false
  } else if (email != confirmEmail) {
    errorMessage.value = 'Emails do not match!'
    return false
  } else if (password != confirmPassword) {
    errorMessage.value = 'Passwords do not match!'
    return false
  }

  errorMessage.value = ''
  return true
}

const toast = useTemplateRef('confirm_toast')
const code = ref('')

async function confirm_signup() {
  const { isSignUpComplete, nextStep } = await confirmSignUp({
    username: confirmed_email.value,
    confirmationCode: code.value,
  })

  console.log('Complete?: %s', isSignUpComplete.toString())
  console.log('Next Step: %s', nextStep.signUpStep)

  await autoSignIn()

  window.location.replace('/profile')
}
</script>

<template>
  <div class="flex justify-center">
    <form id="signUpForm" class="flex flex-col w-[75%] gap-2 p-4" @submit="handleSignUp">
      <h1>Sign Up</h1>
      <input name="username" type="text" placeholder="Username" required class="rounded-full p-2" />
      <input name="email" type="text" placeholder="Email" required class="rounded-full p-2" />
      <input
        name="confirm_email"
        type="text"
        placeholder="Confirm Email"
        required
        class="rounded-full p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        class="rounded-full p-2"
      />
      <input
        name="confirm_password"
        type="password"
        placeholder="Password"
        required
        class="rounded-full p-2"
      />
      <input type="submit" value="Sign Up" class="rounded-full p-2" />
      <p v-if="errorMessage !== ''" class="text-red-500">{{ errorMessage }}</p>
    </form>
  </div>
  <ToastComponent ref="confirm_toast">
    <template v-slot:title>Confirm Sign Up</template>
    <template v-slot:content>
      <p>
        An code has been sent to <i>{{ confirmed_email }}.</i> You know what to do.
      </p>
      <input name="code" type="text" placeholder="Verification Code" v-model="code" />
      <button @click="confirm_signup">Confirm</button>
    </template>
  </ToastComponent>
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
