<script setup lang="ts">
import { generateClient } from 'aws-amplify/api'
import { ref } from 'vue'

import type { Schema } from '@backend/data/resource'
import XitsScroller from '../XitsScroller.vue'
import { useUserStore } from '@/stores/user'

const current_user = useUserStore()

const filter = {
  or: Array<{ user_id: { ne: string } }>(),
}

for (const user_id of current_user.user_data!.blocking) {
  filter.or.push({ user_id: { ne: user_id! } })
}

const client = generateClient<Schema>()

const first_get = await client.models.Xit.listByParent(
  {
    parent_id: 'None',
  },
  {
    sortDirection: 'DESC',
    limit: 25,
    selectionSet: ['id', 'text', 'createdAt', 'user.username', 'image'],
    filter,
  },
)

const xits = ref(first_get.data)
const nextToken = ref(first_get.nextToken)
const errors = ref(first_get.errors)

console.log(xits.value, nextToken.value, errors.value)

const loading = ref(false)

async function get_more() {
  loading.value = true
  const new_data = await client.models.Xit.listByParent(
    {
      parent_id: 'None',
    },
    {
      sortDirection: 'DESC',
      limit: 25,
      nextToken: nextToken.value,
      selectionSet: ['id', 'text', 'createdAt', 'user.username', 'image'],
      filter,
    },
  )

  nextToken.value = new_data.nextToken
  errors.value = new_data.errors
  xits.value = xits.value.concat(new_data.data)

  loading.value = false
}

console.log(xits.value, nextToken.value, errors.value)
</script>

<template>
  <div style="height: calc(100% - (var(--spacing) * 20))">
    <XitsScroller @get_more="get_more" :xits="xits" :nextToken="nextToken" />
  </div>
</template>
