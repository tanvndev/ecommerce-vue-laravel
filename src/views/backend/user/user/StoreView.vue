<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <BreadcrumbComponent :titlePage="pageTitle" />
        <form @submit.prevent="onSubmit">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-card class="mt-3">
                <AleartError :errors="errors" />
                <a-row :gutter="[16, 10]">
                  <a-col :span="12">
                    <InputComponent label="Họ tên thành viên" :required="true" name="fullname" />
                  </a-col>

                  <a-col :span="12">
                    <InputComponent label="Địa chỉ email" :required="true" name="email" />
                  </a-col>

                  <a-col :span="12">
                    <InputComponent label="Số điện thoại" :required="true" name="phone" />
                  </a-col>

                  <a-col :span="12">
                    <InputComponent label="Mật khẩu" :required="true" name="phone" />
                  </a-col>

                  <a-col :span="12">
                    <SelectComponent
                      label="Nhóm thành viên"
                      name="user_catalogue_id"
                      placeholder="Chọn nhóm thành viên"
                      :options="userCatalogues"
                      :required="true"
                    />
                  </a-col>
                  <a-col :span="12">
                    <label for="phone" class="mb-2 block text-sm font-medium text-gray-900"
                      >Ảnh đại diện</label
                    >
                    <a-upload
                      v-model:file-list="image"
                      list-type="picture"
                      :max-count="1"
                      action=""
                    >
                      <a-button>
                        <i class="fal fa-upload mr-3"></i>
                        Tải lên ảnh (Tối đa 1)
                      </a-button>
                    </a-upload>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card class="mt-3">
                <AleartError :errors="errors" />
                <a-row :gutter="[16, 15]">
                  <a-col :span="8">
                    <SelectComponent
                      label="Quận/Thành phố"
                      name="province_id"
                      placeholder="Chọn Tỉnh/Thành phố"
                      :options="provinces"
                      :required="true"
                      @onChange="getLocation('districts', $event)"
                    />
                  </a-col>

                  <a-col :span="8">
                    <SelectComponent
                      label="Quận/Huyện"
                      name="district_id"
                      placeholder="Chọn Quận/Huyện"
                      :options="districts"
                      :required="true"
                      @onChange="getLocation('wards', $event)"
                    />
                  </a-col>

                  <a-col :span="8">
                    <SelectComponent
                      label="Phường/Xã"
                      name="ward_id"
                      placeholder="Chọn Phường/Xã"
                      :options="wards"
                      :required="true"
                    />
                  </a-col>

                  <a-col :span="24">
                    <InputComponent label="Địa chỉ" name="address" />
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
          </a-row>

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
  InputComponent,
  SelectComponent
} from '@/components/backend';
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import { formatMessages } from '@/utils/format';
import { useStore } from 'vuex';
import { formatDataToSelect } from '@/utils/format';
import { UserService, UserCatalogueService, LocationService, BaseService } from '@/services';
import * as yup from 'yup';
import router from '@/router';

const pageTitle = ref('Thêm mới thành viên');
const errorsForm = ref({});
const userCatalogues = ref([]);
const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const id = router.currentRoute.value.params.id || null;
const store = useStore();

const { handleSubmit, setValues, defineField, errors } = useForm({
  validationSchema: yup.object({
    // name: yup.string().required('Tên nhóm thành viên không được để trống.'),
  })
});

const [image] = defineField('image');

const onSubmit = handleSubmit(async (values) => {
  console.log(values.image);
  return;

  // let response = null;
  // if (router.currentRoute.value.name.includes('update')) {
  //   response = await UserService.update(id, values);
  // } else {
  //   response = await UserService.create(values);
  // }

  // if (!response.success) {
  //   return (errorsForm.value = formatMessages(response.messages));
  // }
  // store.dispatch('antStore/showMessage', { type: 'success', message: response.messages });
  // errorsForm.value = {};
  // router.push({ name: 'user.catalogue.index' });
});

const getCatalogues = async () => {
  const response = await UserCatalogueService.getAll();
  const data = formatDataToSelect(response.data);
  userCatalogues.value = data;
};

const getProvinces = async () => {
  const response = await LocationService.getProvinces();
  provinces.value = formatDataToSelect(response.data, 'code', 'name');
};

const getLocation = async (target, location_id) => {
  if (target === 'districts') {
    setValues({ district_id: null, ward_id: null });
  } else if (target === 'wards') {
    setValues({ ward_id: null });
  }

  if (!location_id || !target) {
    return false;
  }

  const response = await LocationService.getLocations({ target, location_id });
  const responseFormat = formatDataToSelect(response.data[target], 'code', 'name');

  if (target === 'districts') {
    districts.value = responseFormat;
  } else if (target === 'wards') {
    wards.value = responseFormat;
  }
};

const getOne = async () => {
  const response = await UserService.getOne(id);
  setValues({ name: response.data?.name, description: response.data?.description });
};

onMounted(() => {
  getCatalogues();
  getProvinces();

  if (id && id > 0) {
    pageTitle.value = 'Cập nhập thành viên.';
    getOne();
  }
});
</script>
