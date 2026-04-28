<script setup>
defineProps({
  label: String,
  variant: {
    type: String,
    default: "primary"
  }
});
</script>

<template>
	<div class="container">
		<img src="/logo/milton.png" alt="Milton Logo" class="logo" />
	<div class="roles">
		<RouterLink :to="{ path: 'login-create', query: { role: 'customer' } }">Mit Hus</RouterLink>
	</div>

	<div class="test">
		<RouterLink :to="{ path: 'login-create', query: { role: 'manager' } }">Byggeleder</RouterLink>
	</div>

	<div class="test">
		<RouterLink :to="{ path: 'login-create', query: { role: 'admin' } }">Administrator</RouterLink>
	</div>
	</div>

	<button :class="['btn', variant]">
    {{ label }}
  </button>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #F5F3EE;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 40px;
}

.roles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>