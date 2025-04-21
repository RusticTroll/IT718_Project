<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabControl from '@/components/TabControl.vue'

const New = defineAsyncComponent(() => import('@/components/Home/NewXitsComponent.vue'))
const Following = defineAsyncComponent(() => import('@/components/Home/FollowingComponent.vue'))

const tabs = {
  New,
  Following,
}

await new Promise((resolve) => setTimeout(resolve, 2000))
</script>

<template>
  <TabControl :tabs="tabs" initial_tab="Following" />
</template>
