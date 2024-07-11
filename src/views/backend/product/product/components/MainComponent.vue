<template>
  <a-card class="mt-3">
    <template #title>
      <span> Dữ liệu sản phẩm </span>
    </template>
    <a-row :gutter="[16, 10]">
      <a-col :span="12">
        <SelectComponent
          name="product_type"
          label="Loại sản phẩm"
          :required="true"
          :options="productTypeData"
          :showSearch="false"
          placeholder="Chọn loại sản phẩm"
          @onChange="handleType"
        />
      </a-col>
      <a-col :span="12">
        <InputComponent name="sku" label="Mã sản phẩm" placeholder="Tự sinh nếu không nhập" />
      </a-col>

      <a-col :span="24" v-if="productType">
        <a-tabs v-model:activeKey="activeKey" tab-position="top">
          <!-- Chung -->
          <a-tab-pane key="1">
            <template #tab>
              <span>
                <i class="fas fa-wrench mr-1"></i>
                Chung
              </span>
            </template>
            <a-row :gutter="[16, 10]">
              <a-col span="12">
                <InputNumberComponent name="price" label="Giá bán thường" />
              </a-col>
              <a-col span="12">
                <InputNumberComponent name="sale_price" label="Giá khuyến mãi" />
              </a-col>
              <a-col>
                <SwitchComponent
                  name="is_discount"
                  checkText="Lên lịch"
                  uncheckText="Không lên lịch"
                  @onChange="handleDiscount"
                />
              </a-col>
            </a-row>
            <a-row :gutter="[16, 10]" class="mt-3" v-if="isDiscount">
              <a-col span="12">
                <InputDateComponent
                  name="sale_price_start_at"
                  :showTime="true"
                  label="Thời gian bắt đầu giảm giá"
                />
              </a-col>
              <a-col span="12">
                <InputDateComponent
                  name="sale_price_end_at"
                  :showTime="true"
                  label="Thời gian kết thúc giảm giá"
                />
              </a-col>
            </a-row>
          </a-tab-pane>
          <!-- Kho hang -->
          <a-tab-pane key="2">
            <template #tab>
              <span>
                <i class="far fa-dolly-flatbed-alt mr-1"></i>
                Kiểm kê kho hàng
              </span>
            </template>
            <a-row :gutter="[16, 10]">
              <a-col span="12">
                <InputNumberComponent name="stock" label="Số lượng" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <!-- Giao hang -->
          <a-tab-pane key="3">
            <template #tab>
              <span>
                <i class="far fa-shipping-fast mr-1"></i>
                Giao hàng
              </span>
            </template>
            <a-row :gutter="[16, 10]">
              <a-col span="6">
                <InputNumberComponent name="weight" label="Cân nặng (kg)" />
              </a-col>
              <a-col span="6">
                <InputNumberComponent name="length" label="Dài (cm)" />
              </a-col>
              <a-col span="6">
                <InputNumberComponent name="width" label="Rộng (cm)" />
              </a-col>
              <a-col span="6">
                <InputNumberComponent name="hight" label="Cao (cm)" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <!--  -->
          <a-tab-pane key="4">
            <template #tab>
              <span>
                <i class="fas fa-link mr-1"></i>
                Các sản phẩm được kết nối
              </span>
            </template>
            <div>Các sản phẩm được kết nối</div>
          </a-tab-pane>
          <!--  -->
          <div v-if="productType === 'variable'">
            <a-tab-pane key="5">
              <template #tab>
                <span>
                  <i class="fas fa-tasks-alt mr-1"></i>
                  Các thuộc tính
                </span>
              </template>
              <div>Các thuộc tính</div>
            </a-tab-pane>
            <!--  -->
            <a-tab-pane key="6">
              <template #tab>
                <span>
                  <i class="far fa-table mr-1"></i>
                  Các biến thể
                </span>
              </template>
              <div>Các biến thể</div>
            </a-tab-pane>
          </div>
        </a-tabs>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup>
import {
  SelectComponent,
  InputNumberComponent,
  SwitchComponent,
  InputComponent
} from '@/components/backend';
import InputDateComponent from '@/components/backend/includes/InputDateComponent.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const activeKey = ref('3');
const productType = ref('simple');
const productTypeData = computed(() => store.getters['languageStore/getProductType']);
const isDiscount = ref(false);

const handleDiscount = (value) => {
  isDiscount.value = value;
};
const handleType = (value) => {
  productType.value = value;
};
</script>
