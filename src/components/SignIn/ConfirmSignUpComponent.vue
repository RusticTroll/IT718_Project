<script setup lang="ts">
import { confirmSignUp } from 'aws-amplify/auth'
import { ref } from 'vue'

const props = defineProps({
  email: String,
})

const code = ref('')

async function confirm_signup() {
  const { isSignUpComplete, nextStep } = await confirmSignUp({
    username: props.email!,
    confirmationCode: code.value,
  })

  console.log('Complete?: %s', isSignUpComplete.toString())
  console.log('Next Step: %s', nextStep.signUpStep)
}
</script>

<template>
  <p>
    An code has been sent to <i>{{ email }}. You know what to do.</i>
  </p>
  <input name="code" type="text" placeholder="Verification Code" v-model="code" />
  <button @click="confirm_signup">Confirm</button>
</template>
