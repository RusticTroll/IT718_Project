<script setup lang="ts">
import { ref } from 'vue'

const xit_text = ref('')

async function post_xit() {
  alert(xit_text.value)
}
</script>

<template>
  <main class="flex flex-col p-2 h-full">
    <textarea class="flex-grow mb-2" placeholder="Let the Xit flow out here" v-model="xit_text" />
    <button class="flex-none" @click="post_xit">Xit Yourself</button>
  </main>
</template>
