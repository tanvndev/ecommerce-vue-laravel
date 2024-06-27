<template>
  <div>
    <a-input
      v-model:value="value"
      :class="className"
      :id="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :status="errorMessage ? 'error' : ''"
    />
    <span class="mt-[6px] block text-[12px] text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: 'h-[40px]'
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
});

// Tạo field với VeeValidate
const { value, errorMessage } = useField(props.name);
</script>
