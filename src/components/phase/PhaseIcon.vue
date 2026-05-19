<script setup>
import { getPhaseIcon } from '@/utils/PhaseIcons';

defineProps({
  name: String,
});

</script>

<template>
  <img v-if="name" :src="`/icons/${getPhaseIcon(name)}`" :alt="name" />
</template>