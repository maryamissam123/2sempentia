<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('')
const authStore = useAuthStore();

const login = async () => {
    await authStore.login(email.value, password.value)
    console.log('logget ind')
}
</script>

<template>
    <input v-model="email" type="email">
    <input v-model="password" type="password">
    <button @click="login">Log ind</button>
</template>