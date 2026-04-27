<script setup>
</script>

<template>
    <h1>Hvem er du?</h1>
    <RouterLink :to="{ path: 'login-create', query: { role: 'customer' } }">Customer</RouterLink>
    <RouterLink :to="{ path: 'login-create', query: { role: 'manager' } }">Manager</RouterLink>
</template>