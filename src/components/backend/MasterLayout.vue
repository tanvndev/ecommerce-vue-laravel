<template>
  <div class="flex h-screen">
    <SidebarView />
    <div class="flex w-full flex-1 flex-col">
      <HeaderView />
      <main class="h-full overflow-y-auto bg-[#f5f6f7]">
        <slot name="template"></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarView from './SidebarView.vue';
import HeaderView from './HeaderView.vue';
import { useStore } from 'vuex';
import { useSweetAlert } from '@/utils/swal';
import { computed, watchEffect } from 'vue';

const { showToast } = useSweetAlert();

const store = useStore();
const isShowToast = computed(() => store.getters['swalStore/getIsShow']);

watchEffect(() => {
  if (isShowToast.value) {
    const type = store.getters['swalStore/getType'];
    const title = store.getters['swalStore/getMessage'];
    showToast(title, type);
    store.dispatch('swalStore/hideMessage');
  }
});
</script>
