import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/login/LoginView.vue';

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
      meta: { role: 'customer', layout: 'mobile' },
      children: [
        {
          path: '',
          name: 'customer-dashboard',
          meta: { title: 'Kunde Dashboard' },
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
      meta: { role: 'manager', layout: 'mobile' },
      children: [
        {
          path: '',
          name: 'manager-dashboard',
          component: () => import('@/views/manager/ManagerDashboardView.vue')
        },
        {
          path: 'projects',
          name: 'manager-projects',
          component: () => import('@/views/manager/ProjectsView.vue')
        },
        {
          path: 'project/:id',
          name: 'manager-project-details',
          component: () => import('@/views/manager/ProjectDetailView.vue')
        },
        {
          path: 'process',
          name: 'manager-process',
          component: () => import('@/views/manager/ProcessView.vue')
        },
        {
          path: 'chat',
          name: 'manager-chat',
          component: () => import('@/views/manager/ChatView.vue')
        },
        {
          path: 'chat-options',
          name: 'manager-chat-options',
          component: () => import('@/views/manager/ChatOptionsView.vue')
        },
        {
          path: 'chat-list',
          name: 'manager-chat-list',
          component: () => import('@/views/manager/ChatListView.vue')
        },
        {
          path: 'create-project',
          name: 'manager-create-project',
          component: () => import('@/views/manager/CreateProjectView.vue')
        },
        {
          path: 'documents',
          name: 'manager-documents',
          component: () => import('@/views/manager/DocumentsView.vue')
        },
      ]
    },
  ],

  
});

export default router;
