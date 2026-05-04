<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import PhaseIcon from '@/components/PhaseIcon.vue'
import StatusBadge from '@/components/StatusBadge.vue'

defineProps({
  phase: { type: Object, required: true }
})
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