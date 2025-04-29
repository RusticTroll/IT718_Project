<script setup lang="ts">
import type { Schema } from '@backend/data/resource'
import { generateClient } from 'aws-amplify/api'
import XitsScroller from '@/components/XitsScroller.vue'

import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { signOut } from 'aws-amplify/auth'
const current_user = useUserStore()

const props = defineProps<{
  id: string
}>()

const client = generateClient<Schema>()

const { data: user } = await client.models.User.get({ user_id: props.id })
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

if (!current_user.user_data?.blocking.includes(user!.user_id)) {
  const first_get = await client.models.Xit.listByUser(
    {
      user_id: user!.user_id,
    },
    {
      sortDirection: 'DESC',
      limit: 25,
      nextToken: nextToken.value,
      selectionSet: ['id', 'text', 'createdAt', 'user.username'],
    },
  )

  nextToken.value = first_get.nextToken
  errors.value = first_get.errors
  xits.value = xits.value.concat(first_get.data)
}

async function get_more() {
  const new_data = await client.models.Xit.listByUser(
    {
      user_id: user!.user_id,
    },
    {
      sortDirection: 'DESC',
      limit: 25,
      nextToken: nextToken.value,
      selectionSet: ['id', 'text', 'createdAt', 'user.username'],
    },
  )

  nextToken.value = new_data.nextToken
  errors.value = new_data.errors
  xits.value = xits.value.concat(new_data.data)
}

async function block_user() {
  if (user!.user_id == current_user.user_data!.user_id) {
    // Prevent self-blocking
    alert('NO SELF BLOCK')
    return
  }

  const user_blocks = current_user.user_data!.blocking

  await client.models.User.update({
    user_id: current_user.user_data!.user_id,
    blocking: user_blocks.concat(user!.user_id),
  })

  current_user.update_user(true)
}

async function unblock_user() {
  const user_blocks = current_user.user_data!.blocking

  await client.models.User.update({
    user_id: current_user.user_data!.user_id,
    blocking: user_blocks.filter((user_id) => user_id !== user!.user_id),
  })

  current_user.update_user(true)
  get_more()
}

async function follow_user() {
  if (user!.user_id == current_user.user_data!.user_id) {
    // Prevent self-blocking
    alert('NO SELF FOLLOW')
    return
  }

  const user_follows = current_user.user_data!.following

  await client.models.User.update({
    user_id: current_user.user_data!.user_id,
    following: user_follows.concat(user!.user_id),
  })

  current_user.update_user(true)
}

async function unfollow_user() {
  const user_follows = current_user.user_data!.following

  await client.models.User.update({
    user_id: current_user.user_data!.user_id,
    following: user_follows.filter((user_id) => user_id !== user!.user_id),
  })

  current_user.update_user(true)
}

async function sign_out() {
  await signOut()
}
</script>

<template>
  <main class="h-full">
    <div class="flex flex-row h-20 place-items-center border-b-1 border-gray-500">
      <h1 class="flex-grow font-extrabold text-4xl m-4">{{ user!.username }}</h1>
      <div class="flex-none justify-self-end m-1">
        <button
          v-if="
            !current_user.user_data?.following.includes(user!.user_id) &&
            current_user.user!.userId !== user!.user_id
          "
          @click="follow_user"
        >
          Follow
        </button>
        <button
          v-if="
            current_user.user_data?.following.includes(user!.user_id) &&
            current_user.user!.userId !== user!.user_id
          "
          @click="unfollow_user"
        >
          Unfollow
        </button>
      </div>
      <div class="flex-none justify-self-end m-1 mr-4">
        <button
          v-if="
            !current_user.user_data?.blocking.includes(user!.user_id) &&
            current_user.user!.userId !== user!.user_id
          "
          @click="block_user"
        >
          Block
        </button>
        <button
          v-if="
            current_user.user_data?.blocking.includes(user!.user_id) &&
            current_user.user!.userId !== user!.user_id
          "
          @click="unblock_user"
        >
          Unblock
        </button>
      </div>
      <button class="mr-4" v-if="current_user.user!.userId === user!.user_id" @click="sign_out">
        Sign Out
      </button>
    </div>
    <div style="height: calc(100% - (var(--spacing) * 20))">
      <XitsScroller @get_more="get_more" :xits="xits" :nextToken="nextToken" />
    </div>
    <p v-if="current_user.user_data?.blocking.includes(user!.user_id)">
      You have this person blocked dummy. You gotta unblock to see their Xits
    </p>
  </main>
</template>
