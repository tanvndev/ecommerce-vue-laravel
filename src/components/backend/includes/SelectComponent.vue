<template>
  <label :for="props.name" :class="props.labelClass"
    >{{ props.label }}
    <span v-if="props.required" class="font-semibold text-red-500">(*)</span></label
  >
  <div>
    <a-select
      :id="props.name"
      :size="props.size"
      :show-search="props.showSearch"
      v-model:value="value"
      :allowClear="true"
      :autoClearSearchValue="true"
      :options="props.options"
      :filterOption="filterOption"
      :placeholder="props.placeholder"
      :class="props.className"
      @change="handleChange"
    >
    </a-select>
    <span class="mt-[6px] block text-[12px] text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose } from 'vue';
import { useField } from 'vee-validate';

const emits = defineEmits(['onChange']);
const props = defineProps({
  required: {
    type: [Boolean, String],
    default: false
  },
  label: {
    type: String,
    required: true
  },
  labelClass: {
    type: String,
    default: 'mb-2 block text-sm font-medium text-gray-900'
  },
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: 'w-full'
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'large'
  },
  options: {
    type: [Array, Object],
    default: () => []
  },
  showSearch: {
    type: [Boolean, String],
    default: true
  }
});

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const handleChange = (value) => {
  emits('onChange', value);
};
const clearSelected = () => {
  value.value = null;
};

defineExpose({
  clearSelected
});

// Tạo field với VeeValidate
const { value, errorMessage } = useField(props.name);
</script>
