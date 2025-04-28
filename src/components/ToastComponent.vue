<script setup lang="ts">
import { ref } from 'vue'
import CloseButton from './SVGs/CloseButton.vue';

const show = ref(false)

function toggle_shown() {
  show.value = !show.value
}

defineExpose({ toggle_shown })
</script>

<template>
  <Transition>
    <div v-if="show" id="toast">
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-auto flex flex-col bg-black border-gray-500 border rounded-xl place-items-center"
      >
        <div class="flex-none">
          <h1>
            <slot name="title" />
          </h1>
          <button class="absolute right-3 top-3" @click="show = false">
            <CloseButton/>
          </button>
        </div>
        <div id="content-wrapper" class="place-self-stretch flex-grow flex flex-row mr-auto ml-auto mb-1 mt-1">
          <slot name="content" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

h1 {
  font-weight: 700;
  font-size: 18pt;
}
</style>
