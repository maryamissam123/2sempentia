<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    router.push(route.query.role === 'manager' ? '/manager' : '/customer');
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <header class="login-header">
        <img src="@/assets/images/milton.png" alt="Milton Huse" class="logo" />
      </header>

      <div class="view-indicator view-indicator--white">
        LOG IND
      </div>

      <main class="login-form">
        <div class="input-group">
          <img src="@/assets/icons/Email.png" class="input-icon" alt="email" />
          <input v-model="email" type="email" placeholder="*EMAIL" />
        </div>

        <div class="input-group">
          <img src="@/assets/icons/Password.png" class="input-icon" alt="password" />
          <input v-model="password" type="password" placeholder="*ADGANGSKODE" />
          <img src="@/assets/icons/Done.png" class="check-icon" v-if="password.length > 5" alt="done" />
        </div>

        <button class="forgot-link">GLEMT DIN ADGANGSKODE?</button>

        <button class="btn btn--dark" @click="handleLogin">LOG IND</button>
      </main>

      <footer class="login-footer">
        <button class="back-btn" @click="$router.back()">
          <img src="@/assets/icons/Home.png" alt="" />
          <span>TILBAGE</span>
        </button>
      </footer>
    </div>
  </div>
</template>