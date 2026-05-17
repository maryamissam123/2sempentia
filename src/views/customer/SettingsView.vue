<!-- src/views/customer/SettingsView.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/base/BaseInput.vue';

const auth = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');

onMounted(() => {
  name.value = auth.name || '';
  email.value = auth.user?.email || '';
});

async function handleSave() {
  await auth.updateUser({ name: name.value });
};

async function handleLogout() {
  await auth.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <BaseInput v-model="name" placeholder="Navn" />
  <BaseInput v-model="email" placeholder="Email" disabled />

  <button @click="handleSave">Gem</button>
  <button @click="handleLogout">Log ud</button>
</template>