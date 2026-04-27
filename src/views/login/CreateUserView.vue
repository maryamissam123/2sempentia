<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const projectNumber = ref('');

function handleSignup() {
	console.log({
		name: name.value,
		email: email.value,
		password: password.value,
		projectNumber: projectNumber.value
	})
}
</script>

<template>
	<div class="signup">
		<h1>Opret konto</h1>

		<input v-model="name" placeholder="Navn">
		<input v-model="email" placeholder="Email">
		<input v-model="password" placeholder="Kode">
		<input v-model="projectNumber" placeholder="Projektnummer">

		<button @click="handleSignup">Opret konto</button>
	</div>
</template>