<template>
  <a-space>
    <RouterLink
      class="rounded-[6px] border border-yellow-500 px-[14px] py-[7px] text-yellow-500 hover:bg-yellow-500 hover:text-white"
      :to="{ name: routeUpdate, params: { id: props.id } }"
    >
      <i class="fas fa-edit"></i
    ></RouterLink>
    <a-popconfirm title="Bạn có chắc chắn muốn xóa?" @confirm="handleDelete(props.id)">
      <button
        class="rounded-[6px] border border-red-500 px-[16px] py-[4px] text-red-500 hover:bg-red-500 hover:text-white"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </a-popconfirm>
  </a-space>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import axios from '@/configs/axios';
import { useStore } from 'vuex';

const store = useStore();
const emits = defineEmits(['onDelete']);
const props = defineProps({
  id: [Number, String],
  routeUpdate: {
    type: String,
    required: true
  },
  modelName: {
    type: String,
    required: true
  }
});

const handleDelete = async (id) => {
  let urlConvert = `${props.modelName.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase()}`;
  const url = `/${urlConvert}/${id}`;

  try {
    const response = await axios.delete(url);
    const type = response.status == 'success' ? 'success' : 'error';

    store.dispatch('antStore/showMessage', { type, message: response.messages });
    emits('onDelete', id);
  } catch (error) {
    let messages = error.response ? error.response.messages : 'Unexpected error occurred';
    return {
      success: false,
      messages: messages
    };
  }
};
</script>
