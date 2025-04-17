<script setup lang="ts">
import { ref } from 'vue'

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
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-60 flex flex-col bg-black border-gray-500 border rounded-xl place-items-center"
      >
        <div class="flex-none">
          <h1>
            <slot name="title" />
          </h1>
          <button class="absolute right-3 top-3" @click="show = false">
            <svg class="h-4 w-4" fill="#ffffff" viewBox="0 0 460.775 460.775">
              <path
                d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
              />
            </svg>
          </button>
        </div>
        <div id="content-wrapper" class="place-self-stretch flex-grow">
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
