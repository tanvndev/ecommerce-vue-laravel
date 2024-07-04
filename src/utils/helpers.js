const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const resizeImage = (image, width, height) => {
  image = JSON.parse(image)[0];
  const params = [];

  if (width) {
    params.push(`w=${width}`);
  }
  if (height) {
    params.push(`h=${height}`);
  }

  if (params.length > 0) {
    const separator = image.includes('?') ? '&' : '?';
    image += separator + params.join('&');
  }

  return image;
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const getFileNameFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

const getFileFromFileList = (fileList) => {
  if (!fileList || fileList.length === 0) {
    return [];
  }
  const fileArr = fileList.map((file) => file.url);
  return JSON.stringify(fileArr);
};

const getImageToAnt = (images) => {
  const data = [];
  images.forEach((image) => {
    const fileName = getFileNameFromUrl(image);
    data.push({
      uid: fileName,
      name: fileName,
      status: 'done',
      url: image
    });
  });

  return data;
};

export { debounce, resizeImage, getBase64, getFileNameFromUrl, getFileFromFileList, getImageToAnt };
