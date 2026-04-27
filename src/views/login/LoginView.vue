<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const role = computed(() => route.query.role);

const login = async () => {
  const role = await authStore.login(email.value, password.value);
  router.push({ name: `${role}-dashboard` });
};
</script>

<template>
  <h1> Log ind som {{ role === 'customer' ? 'Customer' : 'Manager' }}</h1>
  <form @submit.prevent="login">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button type="submit">Log ind</button>
  </form>

</template>