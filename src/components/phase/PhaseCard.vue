<script setup>
import BaseCard from '@/components/ui/BaseCard.vue';
import PhaseIcon from '@/components/phase/PhaseIcon.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

defineProps({
  phase: { type: Object, required: true }
});
</script>

<template>
  <BaseCard :title="phase.name">
    <template #icon>
      <PhaseIcon :name="phase.name" />
    </template>
    <template #action>
      <StatusBadge :phase="phase" />
    </template>
  </BaseCard>
</template>