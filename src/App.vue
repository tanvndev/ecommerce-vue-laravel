<template>
  <RouterView />
  <FileManager :isVisible="isVisibleFileManager" @onClose="isVisibleFileManager = false" />
</template>
<script setup>
import { FileManager } from './components/backend';
import { provide, ref } from 'vue';
const isVisibleFileManager = ref(false);
const showFileManager = () => {
  isVisibleFileManager.value = true;
};
provide('showFileManager', showFileManager);
</script>
