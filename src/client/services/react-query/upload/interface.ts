export interface IUploadImage {
  id?: number;
  imageUrl: string | null;
  image_id?: number | null;
  post_id?: number | null;
  creator_id: number;
  created_at: Date | null;
}
