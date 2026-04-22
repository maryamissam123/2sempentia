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
      meta: { role: 'customer' },
      children: [
        {
          path: '',
          name: 'customer-dashboard',
          component: () => import('@/views/customer/DashboardView.vue'),
        },
        {
          path: 'process',
          name: 'customer-process',
          component: () => import('@/views/customer/ProcessView.vue'),
        },
        {
          path: 'process/:id',
          name: 'customer-process-details',
          component: () => import('@/views/customer/ProcessDetailsView.vue'),
        },
        {
          path: 'chat-options',
          name: 'customer-chat-options',
          component: () => import('@/views/customer/ChatOptionsView.vue'),
        },
        {
          path: 'chat',
          name: 'customer-chat',
          component: () => import('@/views/customer/ChatView.vue'),
        },
        {
          path: 'faq',
          name: 'customer-faq',
          component: () => import('@/views/customer/FAQView.vue'),
        },
        {
          path: 'documents',
          name: 'customer-documents',
          component: () => import('@/views/customer/DocumentsView.vue'),
        },
      ]
    },
    {
      path: '/manager',
      name: 'manager-dashboard',
      meta: { role: 'manager' },
      component: () => import('@/views/manager/ManagerDashboardView.vue')
    },
  ],

  
});

export default router;
