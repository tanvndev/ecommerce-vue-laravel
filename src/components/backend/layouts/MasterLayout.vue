<template>
  <LoadingIndicator v-if="isLoading" />
  <div class="flex h-screen">
    <SidebarComponent />
    <div class="flex w-full flex-1 flex-col">
      <HeaderComponent />
      <main class="h-full overflow-y-auto bg-[#f5f6f7]">
        <slot name="template"></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { SidebarComponent, HeaderComponent, LoadingIndicator } from '@/components/backend';
import { useStore } from 'vuex';
import { useAntToast } from '@/utils/antToast';
import { computed, watchEffect } from 'vue';

const { showMessage } = useAntToast();
const store = useStore();
const isShowToast = computed(() => store.getters['antStore/getIsShow']);
const isLoading = computed(() => store.getters['loadingStore/getIsLoading']);

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
