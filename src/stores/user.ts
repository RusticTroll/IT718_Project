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

  async function update_user(refresh_user_data: boolean = false) {
    // Get the latest auth session data
    user_auth_session.value = await fetchAuthSession()

    // Reset user and user attributes if we are signed out
    if (!logged_in.value) {
      user.value = undefined
      user_attributes.value = undefined
      return
    }

    // Only refresh data if needed
    if (user.value === undefined || refresh_user_data) {
      user.value = await getCurrentUser()
      user_attributes.value = await fetchUserAttributes()
    }
  }

  return { user, user_auth_session, user_attributes, logged_in, update_user }
})
