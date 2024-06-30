// User catalogue index
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
                  :modelName="modelName"
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
import { onMounted, ref } from 'vue';
import {
  BreadcrumbComponent,
  MasterLayout,
  FilterComponent,
  PublishSwitchComponent,
  ToolboxComponent,
  ActionComponent
} from '@/components/backend';
import UserCatalogueService from '@/services/users/UserCatalogueService';
import { PAGESIZE } from '@/lang/vn/constants';
// Data static
const pageTitle = 'Danh sách nhóm thành viên';
const modelName = 'UserCatalogue';
const routeCreate = 'user.catalogue.store';
const routeUpdate = 'user.catalogue.update';

// Data
const filterOptions = ref({});
const dataSource = ref([]);
const loading = ref(false);
const isShowToolbox = ref(false);
const modelIds = ref([]);

// Pagination
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  hideOnSinglePage: true,
  pageSizeOptions: PAGESIZE
});

// Columns configuration
const columns = [
  {
    title: 'Tên nhóm thành viên',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'Số thành viên',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    sorter: (a, b) => a.description.localeCompare(b.description)
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
    width: '4%'
  }
];

// Methods
const fetchUserData = async () => {
  loading.value = true;
  try {
    const response = await UserCatalogueService.getAll({
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
      ...filterOptions.value
    });
    if (response.success) {
      dataSource.value = response.data.data;
      pagination.value.current = response.data.current_page;
      pagination.value.total = response.data.total;
      pagination.value.pageSize = response.data.per_page;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

const handleTableChange = async (paginationTable, filters, sorter) => {
  pagination.value.current = paginationTable.current || 1;
  pagination.value.pageSize = paginationTable.pageSize || 10;

  await fetchUserData();
};

const onFilterOptions = (filterValue) => {
  filterOptions.value = filterValue;
  fetchUserData();
};

const onChangeToolbox = () => {
  fetchUserData();
};

const onDelete = (key) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  // fetchUserData()
};

// Lifecycle hook
onMounted(fetchUserData);

// Row selection
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    modelIds.value = selectedRowKeys;
    isShowToolbox.value = selectedRows.length > 0;
  }
});
</script>
