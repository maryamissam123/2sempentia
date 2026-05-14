<script setup>
defineProps({
  message: { type: Object, required: true },
  isOwn: { type: Boolean, default: false }
});

function formatTime(timestamp) {
  if (!timestamp?.seconds) return ''
  
  const d = new Date(timestamp.seconds * 1000)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const time = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  
  // I dag
  if (d.toDateString() === now.toDateString()) return time
  
  // I går
  if (d.toDateString() === yesterday.toDateString()) return `I går ${time}`
  
  // Ellers dato + tid
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${time}`
}
</script>

<template>
  <div class="chat-bubble-wrapper" :class="{ 'chat-bubble-wrapper--own': isOwn }">
    <span class="chat-bubble__header">
      {{ message.senderName }}, {{ formatTime(message.createdAt) }}
    </span>

    <div class="chat-bubble" :class="{ 'chat-bubble--own': isOwn }">
      <p class="chat-bubble__text">{{ message.text }}</p>
    </div>
  </div>
</template>