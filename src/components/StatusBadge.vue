<script setup>
import { computed } from 'vue';
import { Check, Hourglass, Lock } from '@lucide/vue'

const props = defineProps({
  phase: {
    type: Object,
    required: true
  }
});

const status = computed(() => {
  return props.phase.completed ? 'done' : 'todo'
});

const icons = {
  done: Check,
  active: Hourglass,
  todo: Lock,
}
</script>

<template>
  <span :class="['status-badge', `status-badge--${status}`]">
    <component :is="icons[status]" />
  </span>
</template>