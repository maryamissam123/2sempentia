<script setup>
import { computed } from 'vue'
import { Check, Hourglass, Lock } from '@lucide/vue'

const props = defineProps({
  completed: { type: Boolean, default: false }
})

const status = computed(() => props.completed ? 'done' : 'todo')

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