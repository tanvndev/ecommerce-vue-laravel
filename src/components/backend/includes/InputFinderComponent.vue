<template>
  <div class="clearfix">
    <a-space class="items-start">
      <a-upload
        v-model:file-list="fileList"
        :before-upload="() => false"
        list-type="picture-card"
        @preview="handlePreview"
        @change="handleSelectFile"
      >
      </a-upload>
      <div @click="isVisibleFileManager = true" class="upload-box" v-if="hanleMultipleFile">
        <i class="fal fa-plus"></i>
        <div class="mt-2 text-sm">Tải tệp</div>
      </div>
    </a-space>
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>

  <FileManager
    :isVisible="isVisibleFileManager"
    @onClose="isVisibleFileManager = false"
    @onSelected="handleSelectFile"
    :multiple="props.multipleFile"
  />
</template>
<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue';
import { FileManager } from '@/components/backend';
import { getBase64, getFileNameFromUrl } from '@/utils/helpers';

const isVisibleFileManager = ref(false);
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([]);

const emits = defineEmits(['onFiles']);
const props = defineProps({
  multipleFile: {
    type: [Boolean, String],
    default: false
  }
});

watch(fileList, (newFile, oldFile) => {
  emits('onFiles', newFile);
});

const hanleMultipleFile = computed(() => {
  if (props.multipleFile) {
    return true;
  }
  if (fileList.value.length > 0 && fileList.value.length < 2) {
    return false;
  }
  return true;
});

const handleSelectFile = (files) => {
  if (files.length > 0) {
    files.forEach((file, index) => {
      if (!fileList.value.some((item) => item.url === file)) {
        const fileName = getFileNameFromUrl(file);
        fileList.value.push({
          uid: fileName,
          name: fileName,
          status: 'done',
          url: file
        });
      }
    });
  }
  emits('onFiles', fileList.value);
};

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name;
};
</script>
<style scoped>
.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-box i {
  font-size: 16px;
}
.upload-box:hover {
  border-color: blue;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
