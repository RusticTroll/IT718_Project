<script lang="ts" setup>
import { ref } from 'vue'

import SignInComponent from '@/components/SignIn/SignInComponent.vue'
import SignUpComponent from '@/components/SignIn/SignUpComponent.vue'
import TabControl from '@/components/TabControl.vue'
import ToastComponent from '@/components/ToastComponent.vue'

const tabs = {
  'Sign In': SignInComponent,
  'Sign Up': SignUpComponent,
}

const showToast = ref(true)
</script>

<template>
  <div class="toast_wrapper">
    <button @click="showToast = !showToast">Toggle Toast</button>
    <TabControl :tabs="tabs" initial_tab="Sign In" />
    <ToastComponent :show="showToast">
      <template v-slot:title> Yippee </template>
      <template v-slot:content>
        <div class="w-8 h-8 bg-green-300" />
      </template>
    </ToastComponent>
  </div>
</template>
