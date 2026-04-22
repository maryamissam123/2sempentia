<script setup>
import { RouterLink } from 'vue-router';
import { Home, TrendingUp, FileText, MessageSquareMore } from '@lucide/vue';

const tabs = [
    { label: 'Hjem', route: '/customer', icon: Home },
    { label: 'Byggeforløb', route: '/customer/process', icon: TrendingUp },
    { label: 'Dokumenter', route: '/customer/documents', icon: FileText },
    { label: 'Chat', route: '/customer/chat-options', icon: MessageSquareMore }
];
</script>

<template>
    <nav> 
        <RouterLink v-for="tab in tabs" :key="tab.label" :to="tab.route">
            <component :is="tab.icon"/>
            {{ tab.label }}
        </RouterLink>
    </nav>
</template>