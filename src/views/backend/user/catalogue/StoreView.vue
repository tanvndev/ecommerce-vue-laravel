<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <BreadcrumbComponent :titlePage="pageTitle" />
        <form @submit.prevent="onSubmit">
          <a-card class="mt-3">
            <AleartError :errors="errors" />
            <a-row :gutter="16">
              <a-col :span="12">
                <label for="name" class="mb-2 block text-sm font-medium text-gray-900"
                  >Tên nhóm thành viên</label
                >
                <InputComponent name="name" />
              </a-col>
              <a-col :span="12">
                <label for="description" class="mb-2 block text-sm font-medium text-gray-900"
                  >Mô tả nhóm thành viên</label
                >
                <InputComponent name="description" />
              </a-col>
            </a-row>
          </a-card>

          <div class="fixed bottom-0 right-[19px] p-10">
            <a-button html-type="submit" type="primary">
              <i class="far fa-save mr-2"></i>
              <span>Lưu thông tin</span>
            </a-button>
          </div>
        </form>
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import { MasterLayout, BreadcrumbComponent, AleartError } from '@/components/backend';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import InputComponent from '@/components/backend/includes/InputComponent.vue';
import { formatMessages } from '@/utils/format';
import router from '@/router';
import { useStore } from 'vuex';
import UserService from '@/services/users/UserCatalogueService';

const pageTitle = 'Thêm mới nhóm thành viên';
const store = useStore();
const errors = ref({});
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Tên nhóm thành viên không được để trống.'),
    description: yup.string().required('Mô tả nhóm thành viên không được để trống.')
  })
});

const onSubmit = handleSubmit(async (values) => {
  const response = await UserService.create(values);

  if (!response.success) {
    return (errors.value = formatMessages(response.messages));
  }

  store.dispatch('antStore/showMessage', { type: 'success', message: response.messages });
  errors.value = {};
  router.push({ name: 'user.catalogue.index' });
});
</script>
