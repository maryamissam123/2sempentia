<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';

const { projectId, phaseStore, loadPhase } = useCustomerProject();

watch(projectId, loadPhase);
</script>

<template>
  <div>
    <h2>{{ phaseStore.phase?.name }}</h2>
    <p>Status: {{ phaseStore.phase?.completed ? 'færdig' : 'ikke færdig' }}</p>
  </div>

  <h3>Kommentar fra byggelederen</h3>
  <ul>
    <li v-for="comment in phaseStore.comments" :key="comment.id">
      {{ comment.text }}
    </li>
  </ul>

</template>