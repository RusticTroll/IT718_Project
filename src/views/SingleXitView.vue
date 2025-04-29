<script setup lang="ts">
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '@backend/data/resource'
import { onMounted, useTemplateRef, ref } from 'vue'
import XitsScroller from '@/components/XitsScroller.vue'
import PenLine from '@/components/SVGs/PenLine.vue'
import { useUserStore } from '@/stores/user'
import ToastComponent from '@/components/ToastComponent.vue'
import NewXitWritter from '@/components/NewXitWritter.vue'

const props = defineProps({
  id: String,
})

const client = generateClient<Schema>()
const { data: xit } = await client.models.Xit.get({ id: props.id! })
const { data: xit_poster } = await xit!.user()

const current_user = useUserStore()

const filter = {
  or: Array<{ user_id: { ne: string } }>(),
}

for (const user_id of current_user.user_data!.blocking) {
  filter.or.push({ user_id: { ne: user_id! } })
}

const initial_replies = await client.models.Xit.listByParent(
  {
    parent_id: props.id!,
  },
  {
    sortDirection: 'DESC',
    limit: 25,
    selectionSet: ['id', 'text', 'createdAt', 'user.username'],
    filter,
  },
)

const xits = ref(initial_replies.data)
const nextToken = ref(initial_replies.nextToken)

async function get_more_replies() {
  const new_data = await client.models.Xit.listByParent(
    {
      parent_id: props.id!,
    },
    {
      sortDirection: 'DESC',
      limit: 25,
      nextToken: nextToken.value,
      selectionSet: ['id', 'text', 'createdAt', 'user.username'],
      filter,
    },
  )

  nextToken.value = new_data.nextToken
  xits.value = xits.value.concat(new_data.data)
}

const replies_scroller = useTemplateRef('replies')
const post_element = useTemplateRef('post')

onMounted(() => {
  replies_scroller.value!.style = `height: calc(100% - (var(--spacing) * 16) - ${post_element.value!.clientHeight}px);`
})

const reply_toast = useTemplateRef('reply_toast')

async function post_xit(text: string) {
  const { errors } = await client.models.Xit.create({
    text,
    user_id: current_user.user!.userId,
    parent_id: props.id!,
  })

  if (errors) {
    console.log(errors)
  }

  window.location.reload()
}
</script>

<template>
  <main class="flex flex-col h-full">
    <div ref="post" class="border-b-1 border-gray-500 p-2">
      <h1 class="font-bold">
        {{ xit_poster!.username }} posted at {{ new Date(xit!.createdAt!).toLocaleString() }}
      </h1>
      <p>{{ xit!.text }}</p>
    </div>
    <div class="p-2 h-16 flex flex-row">
      <h1 class="font-black text-3xl flex-grow">Replies</h1>
      <button class="hover:bg-gray-800" @click="reply_toast!.toggle_shown()">
        <PenLine class="justify-self-end flex-none" size="36" stroke="white" />
      </button>
    </div>
    <div ref="replies" style="height: 100%">
      <XitsScroller :xits="xits" :nextToken="nextToken" @get_more="get_more_replies" />
    </div>
  </main>
  <ToastComponent ref="reply_toast">
    <template v-slot:title>Reply</template>
    <template v-slot:content>
      <NewXitWritter @post_xit="post_xit" />
    </template>
  </ToastComponent>
</template>
