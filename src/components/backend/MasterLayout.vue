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
</script>
