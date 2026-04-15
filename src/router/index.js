import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/customer/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
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
  ],
});

export default router;
