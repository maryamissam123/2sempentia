<script setup>
</script>

<template>
	<h1>Hvem er du?</h1>
	<div class="test">
		<RouterLink :to="{ path: 'login-create', query: { role: 'customer' } }">Customer</RouterLink>
	</div>

	<div class="test">
		<RouterLink :to="{ path: 'login-create', query: { role: 'manager' } }">Manager</RouterLink>
	</div>
</template>