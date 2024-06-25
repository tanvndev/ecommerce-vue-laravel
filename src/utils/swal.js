// utils/alert.js
import Swal from 'sweetalert2';

export function useSweetAlert() {
  const showAlertCustom = (options) => {
    return Swal.fire(options);
  };

  const showAlert = (icon, title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
      timer: 3000
    });
  };

  const showToast = (title, icon = 'success') => {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon,
      title,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  return {
    showAlert,
    showAlertCustom,
    showToast
  };
}
