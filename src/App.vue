<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MagnifyingGlass from './components/SVGs/MagnifyingGlass.vue'
import HomeImage from './components/SVGs/HomeImage.vue'
</script>

<template>
  <nav
    class="md:w-32 md:min-w-32 flex-1 flex flex-col justify-items-stretch md:text-end not-md:flex-row not-md:text-center not-md:w-auto not-md:flex-none text-lg"
  >
    <RouterLink
      v-if="$route.path !== '/signin'"
      to="/"
      class="content-center h-12 not-md:flex-1 flex items-center not-md:justify-center"
    >
      <HomeImage :size="48" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Home</span>
    </RouterLink>
    <RouterLink
      v-if="$route.path !== '/signin'"
      to="/search"
      class="content-center h-12 not-md:flex-1 flex items-center not-md:justify-center"
    >
      <MagnifyingGlass :size="48" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Search</span>
    </RouterLink>
  </nav>

  <div class="flex-none md:w-144 not-md:w-full not-md:flex-grow border-1 border-gray-500">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <component :is="Component" />

              <template #fallback>
                <span class="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>

  <div class="w-16 flex-1 not-md:max-h-0" />
</template>

<style scoped>
.router-link-active span {
  font-weight: bold;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
