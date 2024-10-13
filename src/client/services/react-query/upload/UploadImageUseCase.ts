import { IUploadImage } from "./interface";
import { IUploadImagesRepository } from "./IUploadImageRepository";

export class UploadImageUseCase {
  private uploadImagesRepository: IUploadImagesRepository;
  constructor(uploadImagesRepository: IUploadImagesRepository) {
    this.uploadImagesRepository = uploadImagesRepository;
  }

  public uploadImage = async (images: IUploadImage): Promise<any> => {
    return this.uploadImagesRepository.uploadImages(images);
  };
}

export default {
  UploadImageUseCase,
};
