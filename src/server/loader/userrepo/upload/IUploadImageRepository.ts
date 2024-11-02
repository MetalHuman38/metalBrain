import { IUploadImage } from "./interface";

export interface IUploadImagesRepository {
  uploadImages(image: IUploadImage): Promise<any>;
  deleteImage(image: IUploadImage): Promise<any>;
}
