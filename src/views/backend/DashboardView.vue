<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <InputFinderComponent :multiple-file="true" @on-files="handleFile" />
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import { MasterLayout } from '@/components/backend/';
import InputFinderComponent from '@/components/backend/includes/InputFinderComponent.vue';

const handleFile = (files) => {
  console.log(files);
};
</script>
