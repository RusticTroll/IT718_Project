<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

import ToastComponent from './ToastComponent.vue'

const warning_toast = useTemplateRef('warning')

const character_max = 269
const xit_text = ref('')

const emit = defineEmits<{ (e: 'post_xit', text: string): void }>()

function validate_and_emit() {
  if (xit_text.value.length > character_max || xit_text.value.length == 0) {
    warning_toast.value?.toggle_shown()
    return
  }

  emit('post_xit', xit_text.value)
}
</script>

<template>
  <textarea class="flex-grow mb-2" placeholder="Let the Xit flow out here" v-model="xit_text" />
  <div class="flex flex-row">
    <button class="flex-grow mr-2" @click="validate_and_emit">Xit Yourself</button>
    <span class="flex-none self-center mr-1">{{ xit_text.length }}/{{ character_max }}</span>
  </div>
  <ToastComponent ref="warning">
    <template v-slot:title>
      <span v-if="xit_text.length == 0">Empty</span>
      <span v-else>Too Long</span>
    </template>
    <template v-slot:content>
      <p v-if="xit_text.length == 0">Your Xit cannot be empty.</p>
      <p v-else>Your Xit must be less than {{ character_max }} characters.</p>
    </template>
  </ToastComponent>
</template>
