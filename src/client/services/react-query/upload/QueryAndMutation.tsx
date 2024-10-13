import { useMutation } from "@tanstack/react-query";
import { UploadImageAPI } from "./UploadImageAPI";
import { UploadImageUseCase } from "./UploadImageUseCase";
import { IUploadImage } from "./interface";

export const useUploadImage = () => {
  const uploadImageAPI = new UploadImageAPI();
  const uploadImageUseCase = new UploadImageUseCase(uploadImageAPI);
  return useMutation({
    mutationFn: (image: IUploadImage) => {
      return uploadImageUseCase.uploadImage(image);
    },
  });
};

export default { useUploadImage };
