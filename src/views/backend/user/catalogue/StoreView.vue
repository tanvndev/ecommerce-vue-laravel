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
                <InputComponent name="name" label="Tên nhóm thành viên" :required="true" />
              </a-col>
              <a-col :span="12">
                <InputComponent name="description" label="Mô tả thành viên" :required="true" />
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
import { useCRUD } from '@/composables';

const pageTitle = ref('Thêm mới nhóm thành viên');
const errors = ref({});
const id = router.currentRoute.value.params.id || null;
const store = useStore();
const endpoint = 'users/catalogues';
const { getOne, create, update, messages, data } = useCRUD();

const { handleSubmit, setValues } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Tên nhóm thành viên không được để trống.'),
    description: yup.string().required('Mô tả nhóm thành viên không được để trống.')
  })
});

const onSubmit = handleSubmit(async (values) => {
  let response;
  if (router.currentRoute.value.name.includes('update')) {
    response = await update(endpoint, id, values);
  } else {
    response = await create(endpoint, values);
  }
  if (!response) {
    return (errors.value = formatMessages(messages.value));
  }

  store.dispatch('antStore/showMessage', { type: 'success', message: messages.value });
  errors.value = {};
  router.push({ name: 'user.catalogue.index' });
});

const fetchOne = async () => {
  await getOne(endpoint, id);
  setValues({ name: data.value.name, description: data.value.description });
};

onMounted(() => {
  if (id && id > 0) {
    pageTitle.value = 'Cập nhập nhóm thành viên.';
    fetchOne();
  }
});
</script>
