<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const projectNumber = ref('');

function handleSignup() {
	auth.createUser({
		name: name.value,
		email: email.value,
		password: password.value,
		projectNumber: projectNumber.value
	})
	router.push('/customer')
}
</script>

<template>
	<div class="signup">
		<h1>Opret konto</h1>

		<input v-model="name" placeholder="Navn">
		<input v-model="email" type="email" placeholder="Email">
		<input v-model="password" type="password" placeholder="Kode">
		<input v-model="projectNumber" placeholder="Projektnummer">

		<button @click="handleSignup">Opret konto</button>
	</div>
</template>