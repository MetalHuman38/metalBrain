import { useMutation } from "@tanstack/react-query";
import { UploadImageAPI } from "./UploadImageAPI";
import { UploadImageUseCase } from "./UploadImageUseCase";

export const useUploadImage = () => {
  const uploadImageAPI = new UploadImageAPI();
  const uploadImageUseCase = new UploadImageUseCase(uploadImageAPI);
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadImageUseCase.uploadImage(formData);
    },
  });
};

export default { useUploadImage };
