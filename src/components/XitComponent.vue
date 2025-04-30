<script setup lang="ts">
import { getUrl } from 'aws-amplify/storage';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
  text: string
  createdAt: string | null
  user: {
    username: string
  },
  image: string | null
}>()

const router = useRouter()

async function open_as_single() {
  router.push({ name: 'single_xit', params: { id: props.id } })
}

const image_url = ref('')

if (props.image) {
  const url = await getUrl({
    path: props.image
  })

  image_url.value = url.url.toString()
}
</script>

<template>
  <button style="border: 0; border-radius: 0.25rem" class="w-full text-left hover:bg-gray-700 flex flex-row"
    @click="open_as_single">
    <div class="flex-grow">
      <h1 class="font-bold">
        {{ user.username }} posted at {{ new Date(createdAt!).toLocaleString() }}
      </h1>
      <p>{{ text }}</p>
    </div>
    <img v-if="image" class="max-w-32 flex-none" :src="image_url" />
  </button>
</template>
