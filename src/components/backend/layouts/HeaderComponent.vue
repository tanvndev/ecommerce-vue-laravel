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
      <ul class="flex flex-shrink-0 items-center justify-end space-x-10">
        <li class="relative inline-block text-left">
          <a-dropdown>
            <div class="flex cursor-pointer items-center gap-x-2 focus:outline-none">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfq1kNo3HTwBVKm3bjwaW6W_TJz-s2vs4fDA&s"
                width="20"
                alt="lang"
              />
              <span class="text-sm uppercase text-gray-700 dark:text-gray-400">Việt Nam</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <button type="button" class="flex cursor-pointer items-center gap-x-2 uppercase">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                      width="20"
                      alt="lang"
                    />
                    <span>English</span>
                  </button>
                </a-menu-item>
                <a-menu-item>
                  <button type="button" class="flex cursor-pointer items-center gap-x-2 uppercase">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1024px-Flag_of_the_People%27s_Republic_of_China.svg.png"
                      width="20"
                      alt="lang"
                    />
                    <span>China</span>
                  </button>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </li>
        <li class="relative inline-block text-left">
          <a-dropdown>
            <button class="relative rounded-md align-middle focus:outline-none">
              <i class="fal fa-bell text-[22px] text-emerald-400"></i>
              <span
                class="pulse absolute right-0 top-0 z-10 inline-flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-500 p-1 text-xs font-medium leading-none text-red-100"
                >5</span
              >
            </button>
            <template #overlay>
              <div class="w-[300px] rounded-lg bg-white shadow-lg md:w-[400px]">
                <div class="px-5">
                  <div class="flex items-center justify-between pb-2">
                    <h2 class="mb-0 text-lg">Thông báo</h2>
                    <a-badge
                      :number-style="{ backgroundColor: '#52c41a' }"
                      :count="'5 Thông báo'"
                    />
                  </div>
                  <ul class="border-t pt-3">
                    <li class="border-b pb-1 pt-1 last:border-b-0">
                      <h4>Bạn nhận được 1 đơn hàng từ hệ thống</h4>
                      <p class="mb-1 text-[13px]">Mã đơn: OR98723982323</p>
                      <p class="mb-1 text-[13px]">Địa chỉ: Dong anh ha noi</p>
                    </li>
                    <li class="border-b pb-1 pt-1 last:border-b-0">
                      <h4>Bạn nhận được 1 đơn hàng từ hệ thống</h4>
                      <p class="mb-1 text-[13px]">Mã đơn: OR98723982323</p>
                      <p class="mb-1 text-[13px]">Địa chỉ: Dong anh ha noi</p>
                    </li>
                    <li class="border-b pb-1 pt-1 last:border-b-0">
                      <h4>Bạn nhận được 1 đơn hàng từ hệ thống</h4>
                      <p class="mb-1 text-[13px]">Mã đơn: OR98723982323</p>
                      <p class="mb-1 text-[13px]">Địa chỉ: Dong anh ha noi</p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </a-dropdown>
        </li>

        <li class="relative inline-block text-left">
          <a-dropdown>
            <button
              class="mx-auto h-8 w-8 rounded-full bg-emerald-500 font-medium text-white focus:outline-none dark:bg-gray-500"
            >
              <div
                class="relative inline-block h-8 w-8 rounded-full align-middle"
                aria-hidden="true"
              >
                <img
                  class="h-full w-full rounded-full object-cover"
                  :src="resizeImage(user.image, 100, 100) || 'https://i.ibb.co/WpM5yZZ/9.png'"
                  loading="lazy"
                />

                <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
              </div>
            </button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <RouterLink :to="{ name: 'dashboard' }">
                    <i class="far fa-home mr-2"></i>
                    <span>Dashboard</span>
                  </RouterLink>
                </a-menu-item>
                <a-menu-item>
                  <RouterLink :to="{ name: 'user.update', params: { id: user.id } }">
                    <i class="far fa-cog mr-2"></i>
                    <span>Chỉnh sửa hồ sơ</span>
                  </RouterLink>
                </a-menu-item>
                <a-menu-item @click="store.dispatch('authStore/logout')">
                  <i class="far fa-sign-out mr-2"></i>
                  <span>Đăng xuất</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { resizeImage } from '@/utils/helpers';

const store = useStore();
const user = computed(() => store.getters['authStore/getUser']);

store.commit('languageStore/setLanguage', 'vn');
</script>
