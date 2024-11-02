// Definition: Definition of the interface for uploading images.
export interface IUploadImagesRepository {
  uploadImages(formData: FormData): Promise<any>;
}
