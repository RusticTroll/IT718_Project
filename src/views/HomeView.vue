<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const New = defineAsyncComponent(() => import('@/components/NewXitsComponent.vue'))

const Following = defineAsyncComponent(() => import('@/components/FollowingComponent.vue'))

const currentTab = ref('New')

interface TabsObject {
  readonly [index: string]: unknown
}

const tabs: TabsObject = {
  New,
  Following,
}
</script>

<template>
  <main class="flex flex-col">
    <nav
      class="flex-none grid grid-cols-2 justify-items-stretch items-stretch text-center h-20 border-b-1 border-gray-500"
    >
      <h1
        class="flex-none hover:bg-gray-500 content-center relative transition-all"
        v-for="(_, tab) in tabs"
        :key="tab"
        @click="currentTab = String(tab)"
      >
        <span>{{ tab }}</span>
        <span v-if="currentTab === tab" class="absolute inset-19 bottom-0 block bg-green-600" />
      </h1>
    </nav>

    <component class="flex-grow" :is="tabs[currentTab]" />
  </main>
</template>
