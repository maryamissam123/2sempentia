<script setup>
</script>

<template>
    <RouterLink :to="{ path: 'create-user', query: { role: 'customer' } }">Opret Customer</RouterLink>
    <RouterLink :to="{ path: 'create-user', query: { role: 'manager' } }">Opret Manager</RouterLink>
</template>