<script lang="ts" setup>
import SignInComponent from '@/components/SignIn/SignInComponent.vue'
import SignUpComponent from '@/components/SignIn/SignUpComponent.vue'
import TabControl from '@/components/TabControl.vue'

const tabs = {
  'Sign In': SignInComponent,
  'Sign Up': SignUpComponent,
}
</script>

<template>
  <TabControl :tabs="tabs" initial_tab="Sign In" />
</template>
