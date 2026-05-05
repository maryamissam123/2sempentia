<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  icon: String,
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="base-input">
    <img v-if="icon" :src="`/src/assets/icons/${icon}`" class="base-input__icon" />
    
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="base-input__field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>