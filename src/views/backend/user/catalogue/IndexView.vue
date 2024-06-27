// User catalogue index
<template>
  <MasterLayout>
    <template #template>
      <div class="container mx-auto h-screen">
        <BreadcrumbView :titlePage="pageTitle" />
        <a-card>
          <a-space :size="12" class="flex justify-end">
            <a-dropdown>
              <a-button class="h-[37px]" disabled>
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
              <a-button danger type="primary" class="h-[36px]" disabled>
                <i class="fas fa-trash-alt mr-2"></i>
                <span>Xóa</span>
              </a-button>
            </a-popconfirm>
            <RouterLink
              :to="{ name: 'user.catalogue.store' }"
              class="rounded-[6px] border border-emerald-500 px-[16px] py-[6px] text-emerald-500 hover:bg-emerald-500 hover:text-white"
            >
              <i class="fas fa-plus mr-2"></i>
              <span>Thêm mới</span>
            </RouterLink>
          </a-space>
        </a-card>
        <a-card class="mt-3">
          <a-space class="table-operations mb-5">
            <a-button @click="setAgeSort">Sort age</a-button>
            <a-button @click="clearFilters">Clear filters</a-button>
            <a-button @click="clearAll">Clear filters and sorters</a-button>
          </a-space>
          <a-table bordered :columns="columns" :data-source="data" :row-selection="rowSelection">
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'action'">
                <a-space>
                  <RouterLink
                    class="rounded-[6px] border border-yellow-500 px-[14px] py-[7px] text-yellow-500 hover:bg-yellow-500 hover:text-white"
                  >
                    <i class="fas fa-edit"></i
                  ></RouterLink>
                  <a-popconfirm
                    v-if="data.length"
                    title="Sure to delete?"
                    @confirm="onDelete(record.key)"
                  >
                    <button
                      class="rounded-[6px] border border-red-500 px-[16px] py-[4px] text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </a-popconfirm>
                </a-space>
              </template>

              <template v-if="column.dataIndex === 'publish'">
                <a-switch />
              </template>
            </template>
          </a-table>
        </a-card>
      </div>
    </template>
  </MasterLayout>
</template>

<script setup>
import BreadcrumbView from '@/components/backend/BreadcrumbView.vue';
import MasterLayout from '@/components/backend/MasterLayout.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const pageTitle = 'Danh sách nhóm thành viên';

const columns = [
  {
    title: 'Tên nhóm thành viên ',
    dataIndex: 'name',
    key: 'name',
    filters: [
      {
        text: 'Edrward 0',
        value: 'Edrward 0'
      },
      {
        text: 'Female',
        value: 'female'
      }
    ],
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Số thành viên',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    key: 'age'
  },
  {
    title: 'Mô tả',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Mô tả',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tình trạng',
    dataIndex: 'publish',
    key: 'publish'
  },
  {
    title: 'Thực thi',
    dataIndex: 'action',
    key: 'action',
    width: '4%'
  }
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: i + 2,
    address: `London Park no. ${i}`
  });
}
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
});
</script>
