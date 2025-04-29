<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

import ToastComponent from './ToastComponent.vue'

const warning_toast = useTemplateRef('warning')

const character_max = 269
const xit_text = ref('')

const emit = defineEmits<{ (e: 'post_xit', text: string, image: File | null): void }>()

function validate_and_emit() {
  if (xit_text.value.length > character_max || xit_text.value.length == 0) {
    warning_toast.value?.toggle_shown()
    return
  }

  const image_files = upload_element.value!.files
  let image: File | null = null

  if (image_files) {
    image = image_files[0]
  }

  emit('post_xit', xit_text.value, image)
}

const upload_element = useTemplateRef('image_upload')
const image_url = ref<string | undefined>(undefined)

function preview_image() {
  const image_files = upload_element.value!.files
  let image: File

  if (image_files) {
    image = image_files[0]
  } else {
    image_url.value = undefined
    return
  }

  if (!image.type.startsWith('image')) {
    alert('Images only buddy')
    clear_image()
    return
  } else if (image.size >= 8000000) {
    alert('Images may be at most 8 megabytes in size ')
    clear_image()
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(image)

  reader.onload = (e) => {
    image_url.value = <string>e!.target!.result
  }
}

function clear_image() {
  upload_element.value!.value = ''
  image_url.value = undefined
}
</script>

<template>
  <textarea class="flex-grow mb-2 min-h-64" placeholder="Let the Xit flow out here" v-model="xit_text" />
  <div class="flex flex-row mb-2">
    <input class="flex-grow" ref="image_upload" type="file" accept="image/png, image/jpeg, image/webp, image/gif"
      @change="preview_image" />
    <button class="flex-none ml-2" @click="clear_image">Clear Image</button>
  </div>
  <img class="self-center" :src="image_url" width="200" height="200" v-if="image_url !== undefined" />
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
