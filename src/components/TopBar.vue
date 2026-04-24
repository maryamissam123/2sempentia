<script setup>
import { useRoute } from 'vue-router';
import { Settings, Bell } from '@lucide/vue';

const route = useRoute();
</script>

<template>
  <header class="top-bar">
    <div class="top-bar__row">
      <button class="top-bar__icon">
        <Settings />
      </button>

      <div class="top-bar__spacer"></div>

      <button class="top-bar__icon">
        <Bell />
      </button>
    </div>

    <h1 class="top-bar__title">{{ route.meta.title }}</h1>
  </header>
</template>