import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/login/LoginView.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/customer',
      name: 'customer-dashboard',
      meta: { role: 'customer' },
      component: () => import('@/views/customer/DashboardView.vue')
    },
    {
      path: '/manager',
      name: 'manager-dashboard',
      meta: { role: 'manager' },
      component: () => import('@/views/manager/ManagerDashboardView.vue')
    },





    /*
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('@/views/customer/ProcessView.vue'),
    },
    {
      path: '/process/:id',
      name: 'process-details',
      component: () => import('@/views/customer/ProcessDetailsView.vue'),
    },
    {
      path: '/chat-options',
      name: 'chat-options',
      component: () => import('@/views/customer/ChatOptionsView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/customer/ChatView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/customer/FAQView.vue'),
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('@/views/customer/DocumentsView.vue'),
    },
    */
  ],

  
});

router.beforeEach((to) => {
  const { role, ready } = useAuthStore();
  if (!ready) return true;
  if (to.name === 'login' && role) return { name: `${role}-dashboard` };
  if (to.name !== 'login' && !role) return { name: 'login' };
  if (to.meta.role && to.meta.role !== role) return { name: `${role}-dashboard` };
});

export default router;
