<template>
  <section class="bg-gray-50">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a href="#" class="mb-6 flex items-center text-2xl font-semibold text-gray-900">
        <img
          class="mr-2 h-8 w-8"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Name App
      </a>
      <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1
            class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Đăng nhập
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
            <AleartError :errors="errors" />
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Email</label>
              <InputComponent
                name="email"
                type="text"
                class-name="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600"
              />
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900"
                >Mật khẩu</label
              >
              <InputComponent
                name="password"
                type="password"
                class-name="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >Ghi nhớ mật khẩu</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Quên mật khẩu?</a
              >
            </div>
            <button
              type="submit"
              class="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
            >
              Đăng nhập
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Bạn chưa có tài khoản?
              <RouterLink
                :to="{ name: 'dashboard' }"
                class="font-medium text-primary-600 hover:underline"
                >Đăng ký</RouterLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { InputComponent, AleartError } from '@/components/backend';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import router from '@/router';
import { useStore } from 'vuex';
import { formatMessages } from '@/utils/format';

const store = useStore();
const errors = ref({});
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email('Email không đúng định dạng email.')
      .required('Email không được để trống.'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
      .required('Mật khẩu không được để trống.')
  })
});

const onSubmit = handleSubmit(async (values) => {
  await store.dispatch('authStore/login', values);
  const authState = store.state.authStore;
  if (!authState.status.loggedIn) {
    return (errors.value = formatMessages(authState.messages));
  }

  store.dispatch('antStore/showMessage', { type: 'success', message: 'Đăng nhập thành công.' });
  errors.value = {};
  router.push({ name: 'dashboard' });
});
</script>
