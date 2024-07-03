<template>
  <div class="bg-modal relative h-screen w-full" @click.self="closeModal" v-if="visible">
    <div>
      <div
        class="container absolute mx-auto drop-shadow-xl"
        :style="{ top: top + 'px', left: left + 'px', transform: 'translate(-50%, -50%)' }"
        @mousedown="startDrag"
      >
        <div
          class="header flex cursor-move justify-end border-b bg-gray-100 py-2 pr-3"
          @mousedown.stop="enableDrag"
        >
          <a-button class="" type="text" @click="closeModal"
            ><i class="fal fa-times text-l"></i
          ></a-button>
        </div>
        <div class="mt-3">
          <div class="flex justify-between border-b px-2 pb-3">
            <a-space :size="10">
              <input
                type="file"
                class="hidden"
                accept="image/*"
                multiple
                ref="fileInputRef"
                @change="handleUploadFile"
              />
              <a-button @click="onUploadFile">
                <i class="fal fa-upload mr-2"></i>
                <span> Tải tệp lên </span>
                <span v-if="selectedFileInput" class="ml-2 font-bold text-blue-500"
                  >({{ selectedFileInput.length }}) tệp.</span
                >
              </a-button>
              <a-select ref="select" style="width: 120px">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
              <a-button>
                <i class="fal fa-expand-arrows-alt mr-2"></i>
                <span> Phóng to </span>
              </a-button>
            </a-space>
            <a-button type="link" class="text-black">
              <i class="fal fa-cog rotate-center text-[22px]"></i>
            </a-button>
          </div>
          <a-row>
            <a-col span="20" class="image-container overflow-y-auto border-l">
              <div class="grid w-full grid-cols-7 gap-3 p-2">
                <div
                  class="card-image overflow-hidden rounded-lg bg-gray-50 p-1 text-gray-600 drop-shadow-sm"
                  v-for="i in 100"
                  :key="i"
                  :class="selectedFile.includes(i) ? 'active' : ''"
                  @click="chooseFile(i)"
                >
                  <img
                    class="w-full rounded-[6px] object-cover"
                    src="http://127.0.0.1:8000/images/2024/07/6683dceb7d172.JPG?w=200"
                    alt="Image"
                  />
                  <div class="mt-2 flex flex-col px-1 text-[12px]">
                    <span>Image new {{ i }}.jpg</span>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col span="4">
              <div class="p-3">
                <h2 class="text-l mb-2 uppercase">Chi tiết tệp đính kèm</h2>
                <img
                  class="w-full rounded-[6px] border object-cover"
                  src="http://127.0.0.1:8000/images/2024/07/6683dceb7d172.JPG"
                  alt="Image"
                />
                <div class="mt-2 flex flex-col px-1 text-[12px] text-gray-700">
                  <span class="mb-1 font-bold text-blue-700">{{ imageInfo.name }}</span>
                  <span>{{ imageInfo.date }}</span>
                  <span>{{ imageInfo.size }}</span>
                  <span>{{ imageInfo.width }} x {{ imageInfo.height }}</span>
                </div>
                <a-space class="mt-2 pb-3">
                  <a-popconfirm title="Bạn có chắc chắn muốn xóa?" ok-text="Xóa" cancel-text="Hủy">
                    <a-button danger size="small" type="primary">
                      <i class="fas fa-trash-alt mr-1 text-[12px]"></i>
                      <span class="text-[10px] font-bold uppercase">Xóa</span>
                    </a-button>
                  </a-popconfirm>
                </a-space>
                <div class="border-t">
                  <div class="mt-2">
                    <a-input v-model:value="imageInfo.url" readonly addon-before="URL" />
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const dragging = ref(false);
const top = ref(window.innerHeight / 2);
const left = ref(window.innerWidth / 2);
const mouseX = ref(0);
const mouseY = ref(0);
const selectedFile = ref([]);
const selectedFileInput = ref(null);
const fileInputRef = ref(null);
const imageInfo = ref({
  name: 'Image new 1.jpg',
  url: 'http://127.0.0.1:8000/images/2024/07/6683dceb7d172.JPG',
  size: '134 KB',
  width: '1789px',
  height: '913px',
  date: '3 Tháng Bảy, 2024'
});

const handleUploadFile = (event) => {
  selectedFileInput.value = event.target.files;
  console.log(selectedFileInput.value);
};
const onUploadFile = () => {
  fileInputRef.value.click();
};

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});
const visible = ref(props.isVisible);

watch(
  () => props.isVisible,
  (newVal) => {
    visible.value = newVal;
  }
);
const emits = defineEmits(['onClose']);

const closeModal = () => {
  selectedFile.value = [];
  selectedFileInput.value = null;
  centerModal();
  emits('onClose');
};

const chooseFile = (i) => {
  const index = selectedFile.value.indexOf(i);
  if (index > -1) {
    selectedFile.value.splice(index, 1);
  } else {
    selectedFile.value.push(i);
  }
};

const centerModal = () => {
  top.value = window.innerHeight / 2;
  left.value = window.innerWidth / 2;
};

const enableDrag = (event) => {
  dragging.value = true;
  mouseX.value = event.clientX - left.value;
  mouseY.value = event.clientY - top.value;
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', stopDrag);
};

const startDrag = (event) => {
  if (!dragging.value) return;
  mouseX.value = event.clientX - left.value;
  mouseY.value = event.clientY - top.value;
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', stopDrag);
};

const stopDrag = () => {
  dragging.value = false;
  window.removeEventListener('mousemove', onMove);
  window.removeEventListener('mouseup', stopDrag);
};

const onMove = (event) => {
  if (dragging.value) {
    top.value = event.clientY - mouseY.value;
    left.value = event.clientX - mouseX.value;
  }
};
</script>

<style scoped>
.bg-modal {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.header {
  user-select: none;
}
.container {
  width: 100%;
  height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  transition:
    top 0.1s ease,
    left 0.1s ease; /* Smooth transition for dragging */
}
.tabs-dropdown:hover {
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #9999;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
.card-image {
  position: relative;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  border: 2px solid transparent;
}
.card-image::before {
  position: absolute;
  content: '';
  bottom: -60px;
  right: -80px;
  display: block;
  height: 100px;
  width: 100px;
  background-color: transparent;
  transform: rotate(45deg);
}
.card-image.active {
  border-color: #3b74f0dc;
}
.card-image.active::before {
  background-color: #3b74f0dc;
}
.card-image:hover {
  box-shadow: 3px 1px 15px rgba(0, 0, 0, 0.1);
}
.image-container {
  height: calc(100vh - 210px);
}
</style>
