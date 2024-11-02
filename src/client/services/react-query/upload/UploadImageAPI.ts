import { AxiosConfig } from "../../../axios/AxiosConfig";
import { IUploadImagesRepository } from "./IUploadImageRepository";

export class UploadImageAPI implements IUploadImagesRepository {
  async uploadImages(formData: FormData): Promise<void> {
    try {
      const response = await AxiosConfig.post("/upload", formData, {
        headers: {
          "Custom-Header": "image",
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Unable to upload image");
    }
  }
}

export default {
  UploadImageAPI,
};
