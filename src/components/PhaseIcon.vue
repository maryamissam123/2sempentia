<script setup>
defineProps({
  name: String,
});

const iconMap = {
  fundament: 'Foundation.png',
  vægge:'Wall.png',
  tag: 'Roof.png',
  vindue: 'Window.png',
  dør: 'Door.png',
  interiør: 'Indoor.png',
  nøgle: 'Key.png',
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