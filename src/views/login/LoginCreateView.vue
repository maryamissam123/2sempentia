<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const role = computed(() => route.query.role);
</script>

<template>
    <h1>{{ role === 'customer' ? 'Customer' : 'Manager'}}</h1>

    <RouterLink :to="{ path: 'login', query: { role } }">Login ind</RouterLink>
    <RouterLink :to="{ path: 'create-user', query: { role } }">Opret Bruger</RouterLink>
</template>