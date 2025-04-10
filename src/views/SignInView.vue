<script lang="ts" setup>
import SignInComponent from '@/components/SignInComponent.vue'
import SignUpComponent from '@/components/SignUpComponent.vue'
import TabControl from '@/components/TabControl.vue'

const tabs = {
  'Sign In': SignInComponent,
  'Sign Up': SignUpComponent,
}
</script>

<template>
  <TabControl :tabs="tabs" initial_tab="Sign In" />
</template>
