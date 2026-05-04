<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import PhaseIcon from '@/components/PhaseIcon.vue'

defineProps({
  title: { type: String, required: true },
  phase: { type: Object, default: null }
})
</script>

<template>
  <BaseCard stack :title="title" :subtitle="phase?.name">
    <template #icon>
      <PhaseIcon :name="phase?.name" />
    </template>
  </BaseCard>
</template>