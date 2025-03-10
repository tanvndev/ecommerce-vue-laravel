<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <BreadcrumbComponent :titlePage="pageTitle" />

        <!-- Toolbox -->
        <ToolboxComponent
          :routeCreate="routeCreate"
          :modelName="modelName"
          :isShowToolbox="isShowToolbox"
          :modelIds="modelIds"
          @onChangeToolbox="onChangeToolbox"
        />
        <!-- End toolbox -->

        <!-- Filter -->
        <FilterComponent @onFilter="onFilterOptions" />
        <!-- End filter -->

        <!-- Table -->
        <a-card class="mt-3">
          <a-table
            bordered
            :columns="columns"
            :data-source="dataSource"
            :row-selection="rowSelection"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'publish'">
                <PublishSwitchComponent
                  :record="record"
                  :modelName="modelName"
                  :field="column.dataIndex"
                />
              </template>

              <template v-if="column.dataIndex === 'action'">
                <ActionComponent
                  @onDelete="onDelete"
                  :id="record.id"
                  :routeUpdate="routeUpdate"
                  :endpoint="endpoint"
                />
              </template>
            </template>
          </a-table>
        </a-card>
        <!-- End table -->
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import {
  BreadcrumbComponent,
  MasterLayout,
  FilterComponent,
  PublishSwitchComponent,
  ToolboxComponent,
  ActionComponent
} from '@/components/backend';
import { useCRUD, usePagination } from '@/composables';

// Data static
const pageTitle = 'Danh sách thành viên';
const modelName = 'User';
const routeCreate = 'user.store';
const routeUpdate = 'user.update';
const endpoint = 'users';
const columns = [
  {
    title: 'Tên thành viên',
    dataIndex: 'fullname',
    key: 'fullname',
    sorter: (a, b) => a.fullname.localeCompare(b.fullname)
  },
  {
    title: 'Địa chỉ email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email)
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    sorter: (a, b) => a.phone.localeCompare(b.phone)
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tình trạng',
    dataIndex: 'publish',
    key: 'publish',
    width: '7%'
  },
  {
    title: 'Thực thi',
    dataIndex: 'action',
    key: 'action',
    width: '6%'
  }
];

// Data
const filterOptions = ref({});
const dataSource = ref([]);
const isShowToolbox = ref(false);
const modelIds = ref([]);

// Fetch
const { getAll, loading } = useCRUD();
// Pagination
const {
  pagination,
  rowSelection,
  handleTableChange,
  onChangePagination,
  selectedRowKeys,
  selectedRows
} = usePagination();

// Fetchdata
const fetchData = async () => {
  const payload = {
    page: pagination.current,
    pageSize: pagination.pageSize,
    ...filterOptions.value
  };
  const response = await getAll(endpoint, payload);
  dataSource.value = response.data;
  pagination.current = response.current_page;
  pagination.total = response.total;
  pagination.pageSize = response.per_page;
};

// Watchers
watch(onChangePagination, () => fetchData());
watch(selectedRows, () => {
  isShowToolbox.value = selectedRows.value.length > 0;
  modelIds.value = selectedRowKeys.value;
});

const onFilterOptions = (filterValue) => {
  filterOptions.value = filterValue;
  fetchData();
};

const onChangeToolbox = () => {
  fetchData();
};

const onDelete = (key) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
};

// Lifecycle hook
onMounted(fetchData);
</script>
