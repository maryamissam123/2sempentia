<script setup>
import { ArrowRight } from '@lucide/vue';
import BaseCard from '@/components/base/BaseCard.vue';
</script>

<template>
  <Topbar :rightIcons="['notifications']" />

  <div class="chat-options-page">
    <div class="chat-options-grid">
      
      <RouterLink :to="{ name: 'customer-faq' }" class="no-underline">
        <BaseCard title="FAQ" class="card--top" />
      </RouterLink>

      <RouterLink :to="{ name: 'customer-chat' }" class="no-underline">
        <BaseCard class="card--top">
          <template #icon>
            <div class="icon-relative">
              <img src="/icons/Chat.png" alt="Chat" class="icon-small" />
            </div>
          </template>
        </BaseCard>
      </RouterLink>

      <RouterLink :to="{ name: 'customer-chat' }" class="no-underline full-width">
        <BaseCard class="card--choice">
          <template #default>
            <div class="choice-flow">
              <img src="/icons/Chat.png" alt="Chat" class="icon-large" />
              <ArrowRight class="arrow-yellow" :size="30" stroke-width="3" />
              <img src="/icons/Manager.png" alt="Byggeleder" class="icon-large" />
            </div>
            <span class="choice-label">Tale med byggeleder</span>
          </template>
        </BaseCard>
      </RouterLink>

      <RouterLink :to="{ name: 'customer-chat' }" class="no-underline full-width">
        <BaseCard class="card--choice">
          <template #default>
            <div class="choice-flow">
              <img src="/icons/Chat.png" alt="Chat" class="icon-large" />
              <ArrowRight class="arrow-yellow" :size="30" stroke-width="3" />
              <img src="/images/milton.png" alt="Milton" class="icon-logo" />
            </div>
            <span class="choice-label">Tale med din milton huse rådgiver</span>
          </template>
        </BaseCard>
      </RouterLink>

    </div>
  </div>

  <Tabbar />
</template>