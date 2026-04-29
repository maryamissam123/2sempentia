<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const role = route.query.role || 'customer';

const goToLogin = () => {
  router.push({ name: 'login', query: { role } });
};

const goToSignup = () => {
  router.push({ name: 'create-user', query: { role } }); 
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <header class="login-header">
        <img src="@/assets/images/milton.png" alt="Milton Huse" class="logo" />
      </header>

      <div class="view-indicator view-indicator--yellow">
        {{ role === 'customer' ? 'MIT HUS' : 'BYGGELEDER' }}
      </div>

      <main class="auth-options">
        <button class="btn btn--white" @click="goToLogin">LOG IND</button>
        <button class="btn btn--dark" @click="goToSignup">OPRET KONTO</button>
      </main>

      <footer class="login-footer">
        <button class="back-btn" @click="$router.push('/')">
          <img src="@/assets/icons/Home.png" alt="" />
          <span>TILBAGE</span>
        </button>
      </footer>
    </div>
  </div>
</template>