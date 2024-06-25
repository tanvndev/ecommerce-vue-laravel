<template>
  <div>
    <input v-model="value" :class="computedClass" :id="name" :type="type" />
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
    default:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600'
  },
  type: {
    type: String,
    default: 'text'
  }
});

// Tạo field với VeeValidate
const { value, errorMessage } = useField(props.name);

const computedClass = computed(() => {
  return `${props.className} ${errorMessage.value ? ' border-red-500' : ''}`;
});
</script>
