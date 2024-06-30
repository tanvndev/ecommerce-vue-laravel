<template>
  <div class="text-center">
    <label class="switch">
      <input
        type="checkbox"
        @change="handleChangePublish(props.record.id, props.record.publish, props.modelName)"
        :checked="props.record?.publish == 1 ? true : false"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// const emits = defineEmits(['onPublish']);
const props = defineProps({
  record: Object,
  modelName: String
});

const handleChangePublish = (id, publish, modelName) => {
  console.log(id, publish, modelName);
};
</script>
