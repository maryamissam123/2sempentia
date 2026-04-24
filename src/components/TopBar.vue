<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
  <header class="top-bar">
    <h1 class="top-bar__title">{{ route.meta.title }}</h1>
  </header>
</template>