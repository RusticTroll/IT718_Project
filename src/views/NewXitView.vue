<script setup lang="ts">
import { useRouter } from 'vue-router'
import { generateClient } from 'aws-amplify/api'

import type { Schema } from '@backend/data/resource'
import { useUserStore } from '@/stores/user'
import NewXitWritter from '@/components/NewXitWritter.vue'
import { uploadData } from 'aws-amplify/storage'
const client = generateClient<Schema>()
const user = useUserStore()
const router = useRouter()

function upload_image(image: File): Promise<string | null> {
  const file_reader = new FileReader()

  return new Promise((resolve) => {
    file_reader.onerror = () => {
      file_reader.abort()
      resolve(null)
    }

    file_reader.onload = async () => {
      try {
        const upload = await uploadData({
          data: <ArrayBuffer>file_reader.result,
          path: ({ identityId }) => `images/${identityId}/${self.crypto.randomUUID()}-${image.name}`,
        }).result

        resolve(upload.path)
      } catch {
        alert("An error occured when trying to upload the provided image\n" +
          "Please try again later")
      }
    }

    file_reader.readAsArrayBuffer(image)
  })
}

async function post_xit(text: string, image: File | null) {
  let image_path: string | null = null
  if (image) {
    image_path = await upload_image(image)
    if (!image_path) return;
  }

  const { errors, data: new_xit } = await client.models.Xit.create({
    text,
    user_id: user.user!.userId,
    image: image_path
  })

  if (errors) {
    console.log(errors)
  }

  router.push({ name: 'single_xit', params: { id: new_xit!.id } })
}
</script>

<template>
  <main class="flex flex-col p-2 h-full">
    <NewXitWritter @post_xit="post_xit" />
  </main>
</template>
