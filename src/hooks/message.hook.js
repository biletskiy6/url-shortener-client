import { useCallback } from "react";
import { toast } from "react-toastify";
export const useMessage = () => {
  return useCallback((text, toastType) => {
    let toastId = null;
    if (!toast.isActive(toastId)) {
      toastId = toast[toastType](text, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  }, []);
};
