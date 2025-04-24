import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'

const HomeView = () => Promise.resolve(import('@/views/HomeView.vue'))
const SearchView = () => Promise.resolve(import('@/views/SearchView.vue'))
const ProfileView = () => Promise.resolve(import('@/views/ProfileView.vue'))
const SignInView = () => Promise.resolve(import('@/views/SignIn/SignInView.vue'))
const ConfirmSignUpView = () => Promise.resolve(import('@/views/SignIn/ConfirmSignUpView.vue'))
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
        only_after_signin: false,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        requires_auth: true,
        only_after_signin: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requires_auth: true,
        only_after_signin: false,
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: {
        requires_auth: false,
        only_after_signin: false,
      },
    },
    {
      path: '/confirm_signup',
      name: 'confirm_signup',
      component: ConfirmSignUpView,
      meta: {
        requires_auth: false,
        only_after_signin: true,
      },
    },
    {
      path: '/setup_totp',
      name: 'setup_totp',
      component: SetupTotpView,
      meta: {
        requires_auth: false,
        only_after_signin: true,
      },
    },
    {
      path: '/verify_totp',
      name: 'verify_totp',
      component: VerifyTotpView,
      meta: {
        requires_auth: false,
        only_after_signin: true,
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  const user = useUserStore()
  await user.update_user()

  // Redirect unauthenticated users to signin
  if (to.meta.requires_auth && !user.logged_in) {
    router.push({ name: 'signin' })
  }

  // Prevent access to /verify_totp and /setup_totp unless the last route was /signin
  if (from.name !== 'signin' && to.meta.only_after_signin) {
    router.push({ name: 'home' })
  }
})

export default router
