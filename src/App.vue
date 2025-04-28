<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MagnifyingGlass from './components/SVGs/MagnifyingGlass.vue'
import HomeImage from './components/SVGs/HomeImage.vue'
import Person from './components/SVGs/Person.vue'
import PenLine from './components/SVGs/PenLine.vue'
import LoadingThrobber from './components/LoadingThrobber.vue'
</script>

<template>
  <nav
    class="lg:w-32 lg:min-w-32 flex-1 flex flex-col justify-items-stretch lg:text-end not-lg:flex-row not-lg:text-center not-lg:w-auto not-lg:flex-none lg:text-2xl text-lg not-lg:24"
  >
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/"
      class="content-center h-24 not-lg:flex-1 flex not-lg:flex-col items-center"
    >
      <HomeImage :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle lg:pl-2">Home</span>
    </RouterLink>
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/search"
      class="content-center h-24 not-lg:flex-1 flex not-lg:flex-col items-center"
    >
      <MagnifyingGlass :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle lg:pl-2">Search</span>
    </RouterLink>
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/profile"
      class="content-center h-24 not-lg:flex-1 flex not-lg:flex-col items-center"
    >
      <Person :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle lg:pl-2">Profile</span>
    </RouterLink>
    <RouterLink
      v-if="$route.meta.requires_auth"
      to="/new"
      class="content-center h-24 not-lg:flex-1 flex not-lg:flex-col items-center"
    >
      <PenLine :size="'4rem'" stroke="hsla(160, 100%, 37%, 1)" />
      <span class="align-middle lg:pl-2">Xit</span>
    </RouterLink>
  </nav>

  <div class="flex-none lg:w-144 not-lg:w-full not-lg:flex-grow border-1 border-gray-500 not-lg:h-[calc(100%-24rem)]">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback>
              <LoadingThrobber/>
            </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </div>

  <div class="w-16 flex-1 not-lg:max-h-0" />
</template>

<style scoped>
.router-link-active span {
  font-weight: bold;
}

.router-link-active {
  background-color: #333333FF;
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
