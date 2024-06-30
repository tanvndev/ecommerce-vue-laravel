<template>
  <a-card class="mt-3">
    <a-space :size="12" class="flex justify-end">
      <a-select
        @change="handleFilterChange"
        v-model:value="filterOptions.publish"
        class="w-[200px]"
      >
        <a-select-option v-for="(item, key) in publishFilter" :key="key" :value="key">
          {{ item }}
        </a-select-option>
      </a-select>
      <a-input-search
        @change="handleFilterChange"
        v-model:value="filterOptions.search"
        placeholder="Nhập vào để tìm kiếm..."
        enter-button
        @search="onSearch"
      />
    </a-space>
  </a-card>
</template>

<script setup>
import { defineEmits, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils/helpers';

const emits = defineEmits(['onFilter', 'onSearch']);
const publishFilter = ref(null);
const filterOptions = reactive({
  publish: '0',
  search: ''
});

const store = useStore();
onMounted(() => {
  publishFilter.value = store.getters['languageStore/getPublishFilter'];
});

const onSearch = (searchValue) => {
  filterOptions.search = searchValue;
  emits('onFilter', filterOptions);
};

const handleFilterChange = debounce(() => {
  emits('onFilter', filterOptions);
}, 500);
</script>
