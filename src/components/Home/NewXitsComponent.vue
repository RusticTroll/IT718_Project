<script setup lang="ts">
import { generateClient } from 'aws-amplify/api'
import { ref } from 'vue'

import type { Schema } from '@backend/data/resource'
import XitComponent from '@/components/Home/XitComponent.vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import LoadingThrobber from '../LoadingThrobber.vue'

const client = generateClient<Schema>()

const first_get = await client.models.Xit.listXitByParentIdAndCreatedAt(
{
  parentId: "None"
},
{
  sortDirection: 'DESC',
  limit: 25

})

const xits = ref(first_get.data)
const nextToken = ref(first_get.nextToken)
const errors = ref(first_get.errors)

console.log(xits.value, nextToken.value, errors.value)

const loading = ref(false)

async function get_more() {
  loading.value = true
  const new_data = await client.models.Xit.listXitByParentIdAndCreatedAt(
{
  parentId: "None"
},
{
  sortDirection: 'DESC',
  limit: 25,
  nextToken: nextToken.value
})

nextToken.value = new_data.nextToken
errors.value = new_data.errors
xits.value = xits.value.concat(new_data.data)

loading.value = false
}

console.log(xits.value, nextToken.value, errors.value)
</script>

<template>
  <div style="height: calc(100% - (var(--spacing) * 20 ))">
    <DynamicScroller class="scroller" :items="xits" :min-item-size="100" show-loader="true">
      <template v-slot="{ item, index, active}">
        <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[
          item.text,
        ]"
        :data-index="index"
      >
        <div class="border-1 border-gray-500 mb-[-1px] p-1">
          <XitComponent v-bind="item"/>
        </div>
        </DynamicScrollerItem>
      </template>
      <template v-slot:after v-if="nextToken !== null">
        <button class="w-full" @click="get_more" v-if="!loading">MORE</button>
      </template>
    </DynamicScroller>
  </div>
</template>

<style scoped>
.scroller {
  height: 100%;
  width: 100%;
}
</style>
