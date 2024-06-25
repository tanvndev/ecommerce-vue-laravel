<template>
  <aside
    class="z-30 hidden w-64 flex-shrink-0 overflow-y-auto bg-white shadow-sm dark:bg-gray-800 lg:block"
  >
    <div class="py-4 text-gray-500">
      <a href="" class="flex items-center justify-center"
        ><img
          class="w-[120px] object-contain object-center"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsScWYmyfPv3XdkNdEFVJ1wlDKMOgcSWUcg&s"
          alt="logo"
      /></a>

      <ul>
        <li
          v-for="item in sidebarData"
          :key="item.name"
          :class="{
            active: isActive(item),
            'px-6 py-4': item.subMenu.length > 0,
            relative: true
          }"
        >
          <button
            type="button"
            class="block text-sm"
            @click="isOpen = !isOpen"
            v-if="item.subMenu.length > 0"
          >
            <div
              class="link-item inline-flex items-center text-[15px] transition-colors duration-150 hover:text-emerald-600"
            >
              <span
                class="line-left absolute inset-y-0 left-0 w-1 rounded-br-lg rounded-tr-lg bg-emerald-500"
                aria-hidden="true"
              ></span>
              <i :class="`${item.icon} mr-3`"></i>
              <span class="font-semibold"> {{ item.name }} </span>
              <i
                :class="['ml-6 text-[10px]', item.isOpen ? 'ti-angle-down' : 'ti-angle-right']"
              ></i>
            </div>
          </button>

          <div class="block px-6 py-4 text-sm" v-else>
            <RouterLink
              :to="{ name: item.route }"
              class="link-item inline-flex items-center text-[15px] transition-colors duration-150 hover:text-emerald-600"
            >
              <span
                class="line-left absolute inset-y-0 left-0 w-1 rounded-br-lg rounded-tr-lg bg-emerald-500"
                aria-hidden="true"
              ></span>
              <i :class="`${item.icon} mr-3`"></i>
              <span class="font-semibold capitalize"> {{ item.name }} </span>
            </RouterLink>
          </div>

          <ul
            class="bg-gray-00 mt-2 overflow-hidden rounded-md p-2 text-sm font-medium transition-all duration-150 dark:bg-gray-900"
            v-if="item.subMenu.length > 0 && isOpen"
          >
            <li class="mb-1" v-for="itemSub in item.subMenu" :key="itemSub.route">
              <RouterLink
                class="sub-link font-serif inline-flex cursor-pointer items-center py-1 text-sm transition-colors duration-150 hover:text-emerald-600"
                :to="{ name: itemSub.route }"
              >
                <i class="ti-minus"></i>
                <span class="ml-2">{{ itemSub.name }}</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>

      <div class="fixed bottom-0 mx-auto mt-3 block w-64 px-6 py-6">
        <button
          class="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-transparent bg-emerald-500 px-5 py-3 align-bottom font-medium leading-5 text-white transition-colors duration-150 hover:bg-emerald-600 focus:outline-none active:bg-emerald-600"
          type="button"
        >
          <span class="flex items-center"
            ><svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              class="mr-3 text-lg"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"
              ></path>
            </svg>
            <span class="text-sm">Đăng xuất</span>
          </span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const sidebarData = ref(null);
const isOpen = ref(false);
const route = useRoute();
const store = useStore();
const isActive = (item) => {
  return route.name == item.route || item.subMenu.some((sub) => route.name == sub.route);
};
onMounted(() => {
  sidebarData.value = store.getters['languageStore/getSidebar'];
});
</script>

<style scoped>
.line-left {
  display: none;
}
.active .line-left {
  display: block;
}
.active .link-item,
.active .sub-link {
  color: #10b981;
}
</style>
