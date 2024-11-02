import { IUploadImagesRepository } from "./IUploadImageRepository";

export class UploadImageUseCase {
  private uploadImagesRepository: IUploadImagesRepository;
  constructor(uploadImagesRepository: IUploadImagesRepository) {
    this.uploadImagesRepository = uploadImagesRepository;
  }

  public uploadImage = async (formData: FormData): Promise<any> => {
    return this.uploadImagesRepository.uploadImages(formData);
  };
}

export default {
  UploadImageUseCase,
};
