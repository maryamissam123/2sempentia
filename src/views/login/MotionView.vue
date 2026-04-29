<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({ name: 'start-view' });
  }, 2000); 
});
</script>

<template>
  <div class="motion-screen">
    <div class="motion-content">
      <img src="@/assets/images/milton.png" alt="Milton Huse" class="motion-logo" />
    </div>
    <div class="bg-lines"></div>
  </div>
</template>