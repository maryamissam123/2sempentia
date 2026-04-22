<script setup>

const tabs = [
    { label: 'Hjem' },
    { label: 'Byggeforløb' },
    { label: 'Dokumenter' },
    { label: 'Chat'}
];
</script>

<template>
    <nav> 
        <button v-for="tab in tabs" :key="tab.label">
            {{ tab.label }}
        </button>
    </nav>
</template>