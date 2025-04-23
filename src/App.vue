<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MagnifyingGlass from './components/SVGs/MagnifyingGlass.vue'
import HomeImage from './components/SVGs/HomeImage.vue'
</script>

<template>
  <nav
    class="lg:w-32 lg:min-w-32 flex-1 flex flex-col justify-items-stretch lg:text-end not-lg:flex-row not-lg:text-center not-lg:w-auto not-lg:flex-none lg:text-2xl text-lg"
  >
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/"
      class="content-center h-24 not-lg:flex-1 flex items-center not-lg:justify-center"
    >
      <HomeImage :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Home</span>
    </RouterLink>
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/search"
      class="content-center h-24 not-lg:flex-1 flex items-center not-lg:justify-center"
    >
      <MagnifyingGlass :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Search</span>
    </RouterLink>
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/profile"
      class="content-center h-24 not-lg:flex-1 flex items-center not-lg:justify-center"
    >
      <MagnifyingGlass :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle pl-2">Profile</span>
    </RouterLink>
  </nav>

  <div class="flex-none lg:w-144 not-lg:w-full not-lg:flex-grow border-1 border-gray-500">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <Suspense>
            <div>
              <component :is="Component" />
            </div>
            <template #fallback>
              <div class="loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </div>

  <div class="w-16 flex-1 not-lg:max-h-0" />
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

.v-enter-active {
  transition: opacity 0.1s;
}

.v-leave-active {
  transition: opacity 0.1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
