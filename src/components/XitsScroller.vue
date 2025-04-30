<script setup lang="ts">
import XitComponent from '@/components/XitComponent.vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

defineProps<{
  xits: {
    id: string
    text: string
    createdAt: string | null
    user: {
      username: string
    },
    image: string | null
  }[]
  nextToken: string | null | undefined
}>()

defineEmits(['get_more'])
</script>

<template>
  <DynamicScroller class="scroller" :items="xits" :min-item-size="10" show-loader="true" style="height: 100%">
    <template v-slot="{
      item,
      index,
      active,
    }: {
      item: {
        id: string
        text: string
        createdAt: string | null
        user: {
          username: string
        },
        image: string | null
      }
      index: any
      active: any
    }">
      <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.text]" :data-index="index">
        <div class="border-1 border-gray-500 mb-[-1px] p-1">
          <XitComponent v-bind="item" />
        </div>
      </DynamicScrollerItem>
    </template>
    <template v-slot:after v-if="nextToken !== null">
      <button class="w-full" @click="$emit('get_more')">MORE</button>
    </template>
  </DynamicScroller>
</template>
