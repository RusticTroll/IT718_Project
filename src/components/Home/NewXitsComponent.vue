<script setup lang="ts">
import { generateClient } from 'aws-amplify/api'
import { ref } from 'vue'

import type { Schema } from '@backend/data/resource'
import XitsScroller from '../XitsScroller.vue'

const client = generateClient<Schema>()

const first_get = await client.models.Xit.listByParent(
  {
    parent_id: 'None',
  },
  {
    sortDirection: 'DESC',
    limit: 25,
    selectionSet: ['id', 'text', 'createdAt', 'user.username'],
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
      selectionSet: ['id', 'text', 'createdAt', 'user.username'],
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
  <XitsScroller @get_more="get_more" :xits="xits" :nextToken="nextToken"/>
</template>
