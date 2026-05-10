<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  to: {
    type: [String, Object],
    default: null
  }
});

function handleClick() {
  if (props.to) {
    router.push(props.to);
  } else {
    router.back();
  }
}
</script>

<template>
  <button class="back-button" @click="handleClick">
    <div class="back-button__icon-wrapper">
      <img src="@/assets/icons/Home.png" alt="Tilbage" />
    </div>
    <span class="back-button__text">TILBAGE</span>
  </button>
</template>