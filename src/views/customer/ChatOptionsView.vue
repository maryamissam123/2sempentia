<script setup>
import { ArrowRight } from '@lucide/vue';
import NotificationBadge from '@/components/base/NotificationBadge.vue';

</script>

<template>
  <Topbar :rightIcons="['notifications']" />

  <div class="chat-options">
    <div class="chat-options__top-row">
      <RouterLink :to="{ name: 'customer-faq' }" class="base-card no-underline">
        <span class="base-card__title">FAQ</span>
      </RouterLink>

      <div class="base-card" style="position: relative;">
        <MessageSquare :size="40" color="#004552" />
        <NotificationBadge :count="1" />
      </div>
    </div>

    <RouterLink :to="{ name: 'customer-chat' }" class="chat-choice-card">
      <div class="chat-choice-card__flow">
        <MessageSquare :size="48" stroke-width="1.5" />
        <ArrowRight class="arrow-yellow" :size="32" stroke-width="3" />
        <Pencil :size="48" stroke-width="1.5" />
      </div>
      <span class="chat-choice-card__label">Tale med byggeleder</span>
    </RouterLink>

    <RouterLink :to="{ name: 'customer-chat' }" class="chat-choice-card">
      <div class="chat-choice-card__flow">
        <MessageSquare :size="48" stroke-width="1.5" />
        <ArrowRight class="arrow-yellow" :size="32" stroke-width="3" />
        <img src="/images/milton.png" class="milton-logo" alt="Milton" />
      </div>
      <span class="chat-choice-card__label">Tale med din milton huse rådgiver</span>
    </RouterLink>
  </div>

  <Tabbar />
</template>