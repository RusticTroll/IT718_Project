import { getCurrentUser } from 'aws-amplify/auth'
import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => Promise.resolve(import('@/views/HomeView.vue'))
const SearchView = () => Promise.resolve(import('@/views/SearchView.vue'))
const SignInView = () => Promise.resolve(import('@/views/SignInView.vue'))
const ProfileView = () => Promise.resolve(import('@/views/ProfileView.vue'))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (to.name !== 'signin') {
    try {
      getCurrentUser()
    } catch {
      return { name: 'signin' }
    }
  }
})

export default router
