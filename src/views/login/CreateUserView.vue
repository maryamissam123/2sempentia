<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const role = computed(() => route.query.role)

const name = ref('');
const email = ref('');
const password = ref('');
const idNumber = ref('');

function createUser() {
	if(role.value === 'customer') {
		auth.createCustomer({
			name: name.value,
			email: email.value,
			password: password.value,
			projectNumber: idNumber.value
		});
		router.push('/customer');
	} else {
		auth.createManager({
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
	<div class="signup">
		<h1>Opret konto som {{ role === 'customer' ? 'Customer' : 'Manager' }}</h1>

		<input v-model="name" placeholder="Navn">
		<input v-model="email" type="email" placeholder="Email">
		<input v-model="password" type="password" placeholder="Kode">
		<input v-model="idNumber" placeholder="id nummer">

		<button @click="createUser">Opret konto</button>
	</div>
</template>