<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps(['tabs', 'initial_tab'])

const current_tab = ref(props.initial_tab)
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
        @click="current_tab = String(tab)"
      >
        <span>{{ tab }}</span>
        <span v-if="current_tab === tab" class="absolute inset-19 bottom-0 block bg-green-600" />
      </h1>
    </nav>

    <component class="flex-grow" :is="tabs[current_tab]" />
  </main>
</template>
