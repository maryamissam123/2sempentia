<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  const role = await authStore.login(email.value, password.value);
  router.push({ name: `${role}-dashboard` });
};
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button type="submit">Log ind</button>
  </form>

  <RouterLink to="/create/customer">Opret konto</RouterLink>
</template>