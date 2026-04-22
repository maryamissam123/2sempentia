<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <h1>Customer Dashboard</h1>
  <button @click="logout">Log ud</button>
</template>