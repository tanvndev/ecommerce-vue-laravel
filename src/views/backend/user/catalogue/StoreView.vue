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
import {
  MasterLayout,
  BreadcrumbComponent,
  AleartError,
  InputComponent
} from '@/components/backend';
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import { formatMessages } from '@/utils/format';
import { useStore } from 'vuex';
import * as yup from 'yup';
import router from '@/router';
import UserService from '@/services/users/UserCatalogueService';

const pageTitle = ref('Thêm mới nhóm thành viên');
const errors = ref({});
const id = router.currentRoute.value.params.id || null;
const store = useStore();

const { handleSubmit, setValues } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Tên nhóm thành viên không được để trống.'),
    description: yup.string().required('Mô tả nhóm thành viên không được để trống.')
  })
});

const onSubmit = handleSubmit(async (values) => {
  let response = null;
  if (router.currentRoute.value.name.includes('update')) {
    response = await UserService.update(id, values);
  } else {
    response = await UserService.create(values);
  }

  if (!response.success) {
    return (errors.value = formatMessages(response.messages));
  }

  store.dispatch('antStore/showMessage', { type: 'success', message: response.messages });
  errors.value = {};
  router.push({ name: 'user.catalogue.index' });
});

const getOne = async () => {
  const response = await UserService.getOne(id);
  setValues({ name: response.data?.name, description: response.data?.description });
};

onMounted(() => {
  if (id && id > 0) {
    pageTitle.value = 'Cập nhập nhóm thành viên.';
    getOne();
  }
});
</script>
