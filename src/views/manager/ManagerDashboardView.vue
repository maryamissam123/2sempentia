<script setup>
</script>

<template>
  <div class="dashboard">
    <RouterLink to="/manager/projects" class="dashboard__card">
      Aktive projekter
    </RouterLink>
    <RouterLink to="/manager/chat-options" class="dashboard__card">
      Chat
    </RouterLink>
    <RouterLink to="/manager/process" class="dashboard__card">
      Byggeforløb
    </RouterLink>
    <RouterLink to="/manager/documents" class="dashboard__card">
      Dokumenter
    </RouterLink>
    <RouterLink to="/manager/create-project" class="dashboard__card">
      Opret projekt
    </RouterLink>
  </div>
</template>