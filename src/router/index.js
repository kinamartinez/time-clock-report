import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeeDetails from '@/views/EmployeeDetails.vue'
import GenerateReport from '@/views/GenerateReport.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/employee/:id',
      name: 'employee',
      component: EmployeeDetails,
      props: true
    },
    {
      path: '/employee/:id/report',
      name: 'report',
      component: GenerateReport,
      props: true
    }
  ]
})

export default router
