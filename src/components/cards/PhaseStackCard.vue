<script setup>
import BaseCard from '@/components/base/BaseCard.vue';
import PhaseIcon from '@/components/PhaseIcon.vue';

defineProps({
  title: { type: String, required: true },
  phase: { type: Object, default: null }
});
</script>

<template>
  <BaseCard stack :title="title">
    <template #icon>
      <PhaseIcon :name="phase?.name" />
    </template>
    <p class="phase-subtitle">{{ phase?.name }}</p>
  </BaseCard>
</template>