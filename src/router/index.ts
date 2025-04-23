import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'

const HomeView = () => Promise.resolve(import('@/views/HomeView.vue'))
const SearchView = () => Promise.resolve(import('@/views/SearchView.vue'))
const SignInView = () => Promise.resolve(import('@/views/SignIn/SignInView.vue'))
const ProfileView = () => Promise.resolve(import('@/views/ProfileView.vue'))
const SetupTotpView = () => Promise.resolve(import('@/views/SignIn/SetupTotpView.vue'))
const VerifyTotpView = () => Promise.resolve(import('@/views/SignIn/VerifyTotpView.vue'))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requires_auth: true,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        requires_auth: true,
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: {
        requires_auth: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requires_auth: true,
      },
    },
    {
      path: '/setup_totp',
      name: 'setup_totp',
      component: SetupTotpView,
      meta: {
        requires_auth: false,
      },
    },
    {
      path: '/verify_totp',
      name: 'verify_totp',
      component: VerifyTotpView,
      meta: {
        requires_auth: false,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const user = useUserStore()
  await user.update_user()

  if (to.meta.requires_auth && !user.logged_in) {
    router.push({ name: 'signin' })
  }
})

export default router
