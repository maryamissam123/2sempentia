import { createRouter, createWebHistory } from 'vue-router';
import { watch } from 'vue';
import LoginView from '@/views/login/LoginView.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'start-view',
      component: () => import('@/views/login/StartView.vue'),
    },
    {
      path: '/login-create',
      name: 'login-create',
      component: () => import('@/views/login/LoginCreateView.vue'),
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: () => import('@/views/login/CreateUserView.vue'),
    },
    {
      path: '/customer',
      meta: { role: 'customer', layout: 'mobile' },
      children: [
        {
          path: '',
          name: 'customer-dashboard',
          meta: { title: 'Mit Hus' },
          component: () => import('@/views/customer/DashboardView.vue'),
        },
        {
          path: 'process',
          name: 'customer-process',
          meta: { title: 'Byggeforløb' },
          component: () => import('@/views/customer/ProcessView.vue'),
        },
        {
          path: 'process/:id',
          name: 'customer-process-details',
          meta: { title: 'Byggeforløb Detaljer', layout: 'detail' },
          component: () => import('@/views/customer/ProcessDetailsView.vue'),
        },
        {
          path: 'chat-options',
          name: 'customer-chat-options',
          meta: { title: 'Chat Muligheder' },
          component: () => import('@/views/customer/ChatOptionsView.vue'),
        },
        {
          path: 'chat',
          name: 'customer-chat',
          meta: { title: 'Chat', layout: 'detail' },
          component: () => import('@/views/customer/ChatView.vue'),
        },
        {
          path: 'faq',
          name: 'customer-faq',
          meta: { title: 'FAQ', layout: 'detail' },
          component: () => import('@/views/customer/FAQView.vue'),
        },
        {
          path: 'documents',
          name: 'customer-documents',
          meta: { title: 'Dokumenter' },
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
          meta: { title: 'Manager Dashboard' },
          component: () => import('@/views/manager/ManagerDashboardView.vue')
        },
        {
          path: 'projects',
          name: 'manager-projects',
          meta: { title: 'Projekter' },
          component: () => import('@/views/manager/ProjectsView.vue')
        },
        {
          path: 'projects/:id',
          name: 'manager-project-details',
          meta: { title: 'Projekt Detaljer', layout: 'detail'},
          component: () => import('@/views/manager/ProjectDetailView.vue')
        },
        {
          path: 'process',
          name: 'manager-process',
          meta: { title: 'Byggeforløb' },
          component: () => import('@/views/manager/ProcessView.vue')
        },
        {
          path: 'chat',
          name: 'manager-chat',
          meta: { title: 'Chat', layout: 'detail' },
          component: () => import('@/views/manager/ChatView.vue')
        },
        {
          path: 'chat-options',
          name: 'manager-chat-options',
          meta: { title: 'Chat Muligheder' },
          component: () => import('@/views/manager/ChatOptionsView.vue')
        },
        {
          path: 'chat-list',
          name: 'manager-chat-list',
          meta: { title: 'Igangværende Chats', layout: 'detail' },
          component: () => import('@/views/manager/ChatListView.vue')
        },
        {
          path: 'create-project',
          name: 'manager-create-project',
          meta: { title: 'Opret Projekt' },
          component: () => import('@/views/manager/CreateProjectView.vue')
        },
        {
          path: 'documents',
          name: 'manager-documents',
          meta: { title: 'Dokumenter' },
          component: () => import('@/views/manager/DocumentsView.vue')
        },
      ]
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (!auth.ready) {
    await new Promise(resolve => {
      const unwatch = watch(() => auth.ready, (isReady) => {
        if (isReady) {
          unwatch();
          resolve();
        }
        // Guard: Hvis ruten er public, tillad adgang. Hvis ikke, tjek om der er en user. Hvis der er en user, tjek om rollen matcher rute-rollen.
      const publicRoutes = ['start-view', 'login', 'login-create', 'create-user'];
        if (publicRoutes.includes(to.name)) return true;
        if (!auth.user) return { name: 'login' };
        if (to.meta.role && to.meta.role !== auth.role) return { name: `${auth.role}-dashboard` };
      });
    });
  }
});

export default router;
