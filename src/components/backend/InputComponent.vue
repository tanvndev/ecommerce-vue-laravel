<template>
  <div>
    <a-input
      v-model:value="value"
      :class="computedClass"
      :id="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :status="errorMessage ? 'error' : ''"
    />
    <small class="mt-[6px] block text-red-500">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
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

const computedClass = computed(() => {
  return `${props.className} ${errorMessage.value ? ' border-red-500' : ''}`;
});
</script>
