<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        Dashboard

        <a-button type="primary" @click="showFileManager">Show File Manager</a-button>
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import { inject } from 'vue';
import MasterLayout from '@/components/backend/layouts/MasterLayout.vue';

const showFileManager = inject('showFileManager');
</script>
