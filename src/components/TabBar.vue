<script setup>
import { RouterLink } from 'vue-router';


const tabs = [
    { label: 'Hjem', route: '/customer' },
    { label: 'Byggeforløb', route: '/customer/process' },
    { label: 'Dokumenter', route: '/customer/documents' },
    { label: 'Chat', route: '/customer/chat-options'}
];
</script>

<template>
    <nav> 
        <RouterLink v-for="tab in tabs" :key="tab.label" :to="tab.route">
            {{ tab.label }}
        </RouterLink>
    </nav>
</template>