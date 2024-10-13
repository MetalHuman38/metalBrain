export interface IUploadImage {
  id?: number;
  imageUrl: string | null;
  image_id?: number | null;
  creator_id: number;
  post_id?: number | null;
  created_at: Date;
}
