<!-- src/views/manager/SettingsView.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const auth = useAuthStore();
const router = useRouter();

const name = ref('');;
const email = ref('')

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

  <BaseButton @click="handleSave">Gem</BaseButton>
  <BaseButton variant="secondary" @click="handleLogout">Log ud</BaseButton>
</template>