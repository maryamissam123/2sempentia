<script setup>
</script>

<template>
  <div class="dashboard">
    <RouterLink :to="{ name: 'manager-projects' }" class="dashboard__card">
      Aktive projekter
    </RouterLink>
    <RouterLink :to="{ name: 'manager-chat-options' }" class="dashboard__card">
      Chat
    </RouterLink>
    <RouterLink :to="{ name: 'manager-documents' }" class="dashboard__card">
      Dokumenter
    </RouterLink>
    <RouterLink :to="{ name: 'manager-create-project' }" class="dashboard__card">
      Opret projekt
    </RouterLink>
  </div>
</template>