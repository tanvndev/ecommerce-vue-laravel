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
import { useAntToast } from '@/utils/antToast';
import { computed, watchEffect } from 'vue';
const { showMessage } = useAntToast();

const store = useStore();
const isShowToast = computed(() => store.getters['antStore/getIsShow']);

watchEffect(() => {
  if (isShowToast.value) {
    const type = store.getters['antStore/getType'];
    const message = store.getters['antStore/getMessage'];
    showMessage(type, message);
    store.dispatch('antStore/removeMessage');
  }
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #acacac;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #797979;
}
</style>
