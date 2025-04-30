import { defineStorage } from "@aws-amplify/backend"

export const storage = defineStorage({
  name: 'media_storage',
  access: (allow) => ({
    'images/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write']),
      allow.authenticated.to(['read'])
    ]
  })
})
