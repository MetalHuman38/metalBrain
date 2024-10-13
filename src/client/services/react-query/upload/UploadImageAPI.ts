import { AxiosConfig } from "../../../axios/AxiosConfig";
import { IUploadImagesRepository } from "./IUploadImageRepository";
import { IUploadImage } from "./interface";

export class UploadImageAPI implements IUploadImagesRepository {
  async uploadImages(image: IUploadImage): Promise<void> {
    try {
      const response = await AxiosConfig.post("/upload", image, {
        headers: {
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
