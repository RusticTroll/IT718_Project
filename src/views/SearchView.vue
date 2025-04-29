<script setup lang="ts">
import MagnifyingGlass from '@/components/SVGs/MagnifyingGlass.vue'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '@backend/data/resource'
import XitsScroller from '@/components/XitsScroller.vue'
import { ref } from 'vue'

const focused = ref(false)
const search_term = ref('')
const search_term_for_get_more = ref('')

const client = generateClient<Schema>()

const xits = ref<
  {
    readonly id: string
    readonly text: string
    readonly createdAt: string | null
    readonly user: {
      readonly username: string
    }
  }[]
>([])
const nextToken = ref<string | null | undefined>(null)
const errors = ref<unknown[] | undefined>([])

console.log(xits.value, nextToken.value, errors.value)

const loading = ref(false)

async function initial_search() {
  loading.value = true
  const new_data = await client.models.Xit.listByParent(
    {
      parent_id: 'None',
    },
    {
      sortDirection: 'DESC',
      limit: 25,
      nextToken: nextToken.value,
      selectionSet: ['id', 'text', 'createdAt', 'user.username'],
      filter: {
        text: {
          contains: search_term.value,
        },
      },
    },
  )

  search_term_for_get_more.value = search_term.value
  nextToken.value = new_data.nextToken
  errors.value = new_data.errors
  xits.value = new_data.data

  loading.value = false

  console.log(xits.value, nextToken.value, errors.value)
}

async function get_more() {
  loading.value = true
  console.log(xits.value, nextToken.value, errors.value)
  const new_data = await client.models.Xit.listByParent(
    {
      parent_id: 'None',
    },
    {
      sortDirection: 'DESC',
      limit: 25,
      nextToken: nextToken.value,
      selectionSet: ['id', 'text', 'createdAt', 'user.username'],
      filter: {
        text: {
          contains: search_term_for_get_more.value,
        },
      },
    },
  )

  nextToken.value = new_data.nextToken
  errors.value = new_data.errors
  xits.value = xits.value.concat(new_data.data)

  loading.value = false

  console.log(xits.value, nextToken.value, errors.value)
}
</script>

<template>
  <main style="height: 100%">
    <div class="flex flex-row justify-center pt-4 pb-4">
      <div
        class="border-1 border-gray-500 rounded-full h-12 w-3/4 relative transition-colors"
        :class="{ 'border-green-500': focused }"
      >
        <input
          class="focus:outline-none w-[90%] h-full"
          v-model="search_term"
          v-on:focusin="focused = true"
          v-on:focusout="focused = false"
        />
        <button
          class="absolute right-1 top-1 bg-gray-500 hover:bg-gray-400"
          style="border-radius: calc(infinity * 1px); padding: 0"
          @click="initial_search"
        >
          <MagnifyingGlass :size="'36'" />
        </button>
      </div>
    </div>
    <div style="height: calc(100% - (var(--spacing) * 20))">
      <XitsScroller @get_more="get_more" :xits="xits" :nextToken="nextToken" />
    </div>
  </main>
</template>

<style scoped>
input {
  border: none;
}
</style>
