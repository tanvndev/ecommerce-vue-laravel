// User catalogue index
<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <BreadcrumbComponent :titlePage="pageTitle" />
        <a-card>
          <a-space :size="12" class="flex justify-end">
            <div v-if="isShowToolbox">
              <a-dropdown class="mr-3">
                <a-button class="h-[37px]">
                  <i class="far fa-tools mr-2"></i>
                  <span>Công cụ</span>
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <button>Xuất bản toàn bộ</button>
                    </a-menu-item>
                    <a-menu-item>
                      <button>Hủy xuất bản toàn bộ</button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>

              <a-popconfirm title="Are you sure delete this task?" ok-text="Xóa" cancel-text="Hủy">
                <a-button danger type="primary" class="h-[36px]">
                  <i class="fas fa-trash-alt mr-2"></i>
                  <span>Xóa</span>
                </a-button>
              </a-popconfirm>
            </div>
            <RouterLink
              :to="{ name: 'user.catalogue.store' }"
              class="rounded-[6px] border border-emerald-500 px-[16px] py-[9px] text-emerald-500 hover:bg-emerald-500 hover:text-white"
            >
              <i class="fas fa-plus mr-2"></i>
              <span>Thêm mới</span>
            </RouterLink>
          </a-space>
        </a-card>
        <!-- Filter -->
        <!-- <a-card class="mt-3">
          <a-space :size="12" class="flex justify-end">
            <a-select ref="select" v-model:value="filterOptions.publish" class="w-[200px]">
              <a-select-option value="">Chọn tình trạng</a-select-option>
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
            <a-input-search
              v-model:value="filterOptions.search"
              placeholder="Nhập vào để tìm kiếm..."
              enter-button
            />
          </a-space>
        </a-card> -->

        <FilterComponent @onFilter="onFilterOptions" />
        <!-- End filter -->

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
                <PublishSwitchComponent :record="record" :modelName="modelName" />
              </template>

              <template v-if="column.dataIndex === 'action'">
                <a-space>
                  <RouterLink
                    class="rounded-[6px] border border-yellow-500 px-[14px] py-[7px] text-yellow-500 hover:bg-yellow-500 hover:text-white"
                    to="#"
                  >
                    <i class="fas fa-edit"></i
                  ></RouterLink>
                  <a-popconfirm title="Sure to delete?">
                    <!-- @confirm="onDelete(record.key)" -->
                    <button
                      class="rounded-[6px] border border-red-500 px-[16px] py-[4px] text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-card>
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import {
  BreadcrumbComponent,
  MasterLayout,
  FilterComponent,
  PublishSwitchComponent
} from '@/components/backend';
import UserCatalogueService from '@/services/users/UserCatalogueService';

const pageTitle = 'Danh sách nhóm thành viên';
const modelName = 'User';

// Data
const filterOptions = ref({});
const dataSource = ref([]);
const loading = ref(false);
const isShowToolbox = ref(false);

// Pagination
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100']
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

const handleTableChange = async (pagination, filters, sorter) => {
  pagination.value.current = pagination.current || 1;
  pagination.value.pageSize = pagination.pageSize || 10;
  await fetchUserData();
};

const onFilterOptions = (filterValue) => {
  filterOptions.value = filterValue;
  fetchUserData();
};

// Lifecycle hook
onMounted(fetchUserData);

// Row selection
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    isShowToolbox.value = selectedRows.length > 0;
  }
});
</script>
