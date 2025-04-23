import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchUserAttributes,
  getCurrentUser,
  type AuthSession,
  type FetchUserAttributesOutput,
  type GetCurrentUserOutput,
} from 'aws-amplify/auth'
import { fetchAuthSession } from 'aws-amplify/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref<GetCurrentUserOutput>()
  const user_auth_session = ref<AuthSession>()
  const user_attributes = ref<FetchUserAttributesOutput>()

  const logged_in = computed(() => user_auth_session.value?.tokens !== undefined)

  async function update_user() {
    user_auth_session.value = await fetchAuthSession()
    if (logged_in.value) {
      user.value = await getCurrentUser()
      user_attributes.value = await fetchUserAttributes()
    } else {
      user.value = undefined
      user_attributes.value = undefined
    }
  }

  return { user, user_auth_session, user_attributes, logged_in, update_user }
})
