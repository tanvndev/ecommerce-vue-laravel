<template>
  <main>
    <div class="flex">
      <aside>
        <SidebarView />
      </aside>
      <div class="flex-1">
        <header>
          <HeaderView />
        </header>
        <slot name="template"></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import SidebarView from './SidebarView.vue';
import HeaderView from './HeaderView.vue';
</script>
