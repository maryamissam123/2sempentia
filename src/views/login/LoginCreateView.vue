<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const role = computed(() => route.query.role);
</script>

<template>
    <h1>{{ role === 'customer' ? 'Customer' : 'Manager'}}</h1>

    <div class="test">
      <RouterLink :to="{ path: 'login', query: { role } }">Login ind</RouterLink>
    </div>

		<div class="test">
    	<RouterLink :to="{ path: 'create-user', query: { role } }">Opret Bruger</RouterLink>
		</div>
</template>