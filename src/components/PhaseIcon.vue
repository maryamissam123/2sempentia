<script setup>
defineProps({
  name: String,
});

const iconMap = {
  fundament: 'Window.png',
  vægge: 'Indoor.png',
  tag: 'Roof.png',
};

function getIcon(name) {
  if (!name) return '';
  const n = name.toLowerCase();
  for (const key in iconMap) {
    if (n.includes(key)) return iconMap[key];
  }
  return '';
}
</script>

<template>
  <img v-if="name" :src="`/icons/${getIcon(name)}`" :alt="name" />
</template>