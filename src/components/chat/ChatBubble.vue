<script setup>
import { formatDate } from '@/utils/date';

defineProps({
  message: { type: Object, required: true },
  isOwn: { type: Boolean, default: false }
});

</script>

<template>
  <div class="chat-bubble-wrapper" :class="{ 'chat-bubble-wrapper--own': isOwn }">
    <span class="chat-bubble__header">
      {{ message.senderName }}, {{ formatDate(message.createdAt, { time: true, relative: true }) }}
    </span>

    <div class="chat-bubble" :class="{ 'chat-bubble--own': isOwn }">
      <p class="chat-bubble__text">{{ message.text }}</p>
    </div>
  </div>
</template>