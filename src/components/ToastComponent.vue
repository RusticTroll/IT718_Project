<script setup lang="ts">
import { ref } from 'vue'

const { show = false } = defineProps({
  show: Boolean,
})
</script>

<template>
  <Transition>
    <div v-if="show" id="toast">
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      <div
        v-if="show"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex flex-col bg-black border-gray-500 border"
      >
        <h1>
          <slot name="title" />
        </h1>
        <slot name="content" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
