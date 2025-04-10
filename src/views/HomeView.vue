<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabControl from '@/components/TabControl.vue'

const New = defineAsyncComponent(() => import('@/components/NewXitsComponent.vue'))
const Following = defineAsyncComponent(() => import('@/components/FollowingComponent.vue'))

const tabs = {
  New,
  Following,
}
</script>

<template>
  <TabControl :tabs="tabs" initial_tab="Following" />
</template>
