<template>
  <label v-if="props.label" :for="props.name" :class="props.labelClass"
    >{{ props.label }}
    <span v-if="props.required" class="font-semibold text-red-500">(*)</span></label
  >
  <div>
    <a-date-picker
      v-if="props.typeInput === 'date'"
      v-model:value="value"
      :class="className"
      :id="props.name"
      :status="errorMessage ? 'error' : ''"
      :size="props.size"
      :allowClear="true"
      :show-time="props.showTime"
    />
    <a-range-picker
      v-if="props.typeInput === 'date-range'"
      v-model:value="value"
      :class="className"
      :id="props.name"
      :status="errorMessage ? 'error' : ''"
      :size="props.size"
      :allowClear="true"
      :show-time="props.showTime"
    />
    <a-time-picker
      v-if="props.typeInput === 'time'"
      v-model:value="value"
      :class="className"
      :id="props.name"
      :status="errorMessage ? 'error' : ''"
      :size="props.size"
      :allowClear="true"
      :show-time="props.showTime"
    />
    <a-time-range-picker
      v-if="props.typeInput === 'time-range'"
      v-model:value="value"
      :class="className"
      :id="props.name"
      :status="errorMessage ? 'error' : ''"
      :size="props.size"
      :allowClear="true"
      :show-time="props.showTime"
    />

    <span class="mt-[6px] block text-[12px] text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { watchEffect } from 'vue';

const props = defineProps({
  typeInput: {
    type: String,
    default: 'date'
  },
  required: {
    type: [Boolean, String],
    default: false
  },
  label: {
    type: String,
    default: ''
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

  size: {
    type: String,
    default: 'large'
  },
  showTime: {
    type: Boolean,
    default: false
  }
});

// Tạo field với VeeValidate
const { value, errorMessage } = useField(props.name);

watchEffect(() => {
  console.log(value.value); // Lấy giá trị hiện tại của input
});
</script>
