<template>
  <header class="bg-white py-4 shadow-sm">
    <div class="container mx-auto flex w-[100%] items-center justify-between">
      <button type="button" class="hidden outline-0 focus:outline-none lg:block">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <ul class="flex flex-shrink-0 items-center justify-end space-x-6">
        <li class="changeLanguage">
          <div class="dropdown relative">
            <div class="flex cursor-pointer items-center gap-x-2 focus:outline-none">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfq1kNo3HTwBVKm3bjwaW6W_TJz-s2vs4fDA&s"
                width="20"
                alt="lang"
              />
              <span class="text-sm uppercase text-gray-700 dark:text-gray-400">Việt Nam</span>
            </div>
            <div class="dropdown-content">
              <button
                type="button"
                class="flex cursor-pointer items-center gap-x-2 hover:bg-gray-200 focus:outline-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                  width="20"
                  alt="lang"
                />
                <span>English</span>
              </button>
              <button
                type="button"
                class="flex cursor-pointer items-center gap-x-2 hover:bg-gray-200 focus:outline-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1024px-Flag_of_the_People%27s_Republic_of_China.svg.png"
                  width="20"
                  alt="lang"
                />
                <span>China</span>
              </button>
            </div>
          </div>
        </li>
        <li class="flex">
          <button class="rounded-md focus:outline-none" aria-label="Toggle color mode">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </li>
        <li class="relative inline-block text-left">
          <button class="relative rounded-md align-middle focus:outline-none">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 text-emerald-500"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg
            ><span
              class="absolute right-0 top-0 z-10 inline-flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-500 p-1 text-xs font-medium leading-none text-red-100"
              >5</span
            >
          </button>
        </li>
        <li class="relative inline-block text-left">
          <button
            class="mx-auto h-8 w-8 rounded-full bg-emerald-500 font-medium text-white focus:outline-none dark:bg-gray-500"
          >
            <div class="relative inline-block h-8 w-8 rounded-full align-middle" aria-hidden="true">
              <img
                class="h-full w-full rounded-full object-cover"
                :src="user.image || 'https://i.ibb.co/WpM5yZZ/9.png'"
                loading="lazy"
              />
              <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const user = computed(() => store.getters['authStore/getUser']);

store.commit('languageStore/setLanguage', 'vn');
</script>

<style scoped>
.dropdown::after {
  content: '';
  width: 100%;
  height: 10px;
  position: absolute;
  right: 0;
  top: 20px;
}
.dropdown-content {
  position: absolute;
  top: 30px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  display: none;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content button {
  padding: 8px 10px;
  font-size: 12px;
  text-transform: uppercase;
  width: 100%;
  transition: background-color 0.2s linear;
}
</style>
