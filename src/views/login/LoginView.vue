<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('')
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
    await authStore.login(email.value, password.value);
    router.push({ name: 'customer-dashboard' });
}
</script>

<template>
    <input v-model="email" type="email">
    <input v-model="password" type="password">
    <button @click="login">Log ind</button>
</template>