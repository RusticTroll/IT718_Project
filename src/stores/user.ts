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
    console.log(user.value)
    console.log(user_attributes.value)
    console.log(user_auth_session.value)
    if (logged_in.value) {
      if (user.value === undefined) {
        console.log('Retreiving user data!')
        user.value = await getCurrentUser()
        user_attributes.value = await fetchUserAttributes()
      } else {
        console.log('Using cached user data!')
      }
    } else {
      user.value = undefined
      user_attributes.value = undefined
    }
  }

  return { user, user_auth_session, user_attributes, logged_in, update_user }
})
