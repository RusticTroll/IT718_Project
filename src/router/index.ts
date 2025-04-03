import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import HomeNewView from '@/views/Home/HomeNewView.vue'
import HomeFollowingView from '@/views/Home/HomeFollowingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'new',
          component: HomeNewView,
          alias: '',
        },
        {
          path: 'following',
          component: HomeFollowingView,
        },
      ],
    },
  ],
})

export default router
