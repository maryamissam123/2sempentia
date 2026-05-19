<script setup>
import { computed } from 'vue'
import { getStatusIcon } from '@/utils/PhaseIcons'

const props = defineProps({
  completed: { type: Boolean, default: false }
});
</script>

<template>
  <img
    :src="`/icons/${getStatusIcon(completed)}`"
    :alt="completed ? 'Færdig' : 'I gang'"
    class="status-badge"
  />
</template>