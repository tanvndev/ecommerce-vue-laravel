<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <BreadcrumbView :titlePage="pageTitle" />
        <a-card class="mt-3">
          <a-tabs v-model:activeKey="activeKey" type="card">
            <a-tab-pane key="1" tab="Tab Title 1">
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tab Title 2">
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Tab Title 3">
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import MasterLayout from '@/components/backend/MasterLayout.vue';
import BreadcrumbView from '@/components/backend/BreadcrumbView.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const pageTitle = 'Thêm mới nhóm thành viên';
</script>
