<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const role = computed(() => route.query.role || 'customer');

const name = ref('');
const email = ref('');
const confirmEmail = ref('');
const password = ref('');
const confirmPassword = ref('');
const idNumber = ref('');

async function createUser() {
  if (role.value === 'customer') {
    await auth.createCustomer({
      name: name.value,
      email: email.value,
      password: password.value,
      projectNumber: idNumber.value
    });
		router.push('/customer');
  } else {
    await auth.createManager({
      name: name.value,
      email: email.value,
      password: password.value,
      employeeNumber: idNumber.value
    });
    router.push('/manager');
	}
}
</script>

<template>
<div class="login-page">
    <div class="login-container">
      <header class="login-header">
        <img src="@/assets/images/milton.png" alt="Milton Huse" class="logo" />
      </header>

      <div class="view-indicator view-indicator--dark">
        OPRET KONTO
      </div>

      <main class="login-form">
        <div class="input-group">
          <input v-model="name" type="text" placeholder="*FULD NAVN" />
        </div>

        <div class="input-group">
          <input v-model="email" type="email" placeholder="*EMAIL" />
        </div>

        <div class="input-group">
          <input v-model="confirmEmail" type="email" placeholder="*EMAIL" />
        </div>

        <div class="input-group">
          <input v-model="password" type="password" placeholder="*ADGANGSKODE" />
          <img src="@/assets/icons/Færdig.png" class="check-icon" v-if="password.length > 5" />
        </div>

        <div class="input-group">
          <input v-model="confirmPassword" type="password" placeholder="*BEKRÆFT ADGANGSKODE" />
          <img src="@/assets/icons/Færdig.png" class="check-icon" v-if="confirmPassword === password && password !== ''" />
        </div>

        <div class="input-group">
          <input v-model="idNumber" :placeholder="role === 'manager' ? '*MEDARBEJDERNUMMER' : '*PROJEKTNUMMER'" />
          <img src="@/assets/icons/Færdig.png" class="check-icon" v-if="idNumber.length > 2" />
        </div>

        <p class="helper-text">
          DIT PROJEKTNUMMER ER ANGIVET I DIN MILTON HUSE-KONTRAKT. INDTASTNINGEN HJÆLPER OS MED AT SIKRE, AT DIN KONTO ER KNYTTET TIL DET KORREKTE HUS.
        </p>

        <button class="btn btn--dark" @click="createUser">OPRET KONTO</button>
      </main>

      <footer class="login-footer">
        <button class="back-btn" @click="$router.back()">
          <div class="back-icon-house"></div>
          <span>TILBAGE</span>
        </button>
      </footer>
    </div>
  </div>
</template>