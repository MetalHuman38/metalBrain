import fs from "fs";
import path from "path";
import imageSize from "image-size";

export class UploadImage {
  constructor(
    public id: number,
    public imageUrl: string | null,
    public image_id: number | null,
    public user_id: number | null,
    public post_id: number | null,
    public creator_id: number,
    public created_at: Date,
    public updated_at: Date
  ) {}

  isUserImage(): boolean {
    return this.user_id === this.id;
  }

  isPostImage(): boolean {
    return this.post_id === this.id;
  }

  isUserOrPostImage(): boolean {
    return this.user_id === this.id || this.post_id === this.id;
  }

  checkFileSize(fileSize: number, maxSize: number): boolean {
    return fileSize <= maxSize;
  }

  async validateImageDimensions(
    filePath: string,
    maxWidth: number,
    maxHeight: number
  ): Promise<boolean> {
    const dimensions = await this.getImageDimensions(filePath);
    return dimensions.width <= maxWidth && dimensions.height <= maxHeight;
  }

  async deleteFile(): Promise<void> {
    const filePath = this.getFilePath("/path/to/files");
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log("File deleted successfully");
    });
  }

  private async getImageDimensions(
    filePath: string
  ): Promise<{ width: number; height: number }> {
    const dimensions = imageSize(filePath);
    return {
      width: dimensions.width || 0,
      height: dimensions.height || 0,
    };
  }

  getFilePath(basePath: string): string {
    return path.join(basePath, this.imageUrl || "");
  }

  isFileExpired(): boolean {
    const expirationPeriod = 30; // 30 days
    const expirationDate = new Date(this.created_at);
    expirationDate.setDate(this.created_at.getDate() + expirationPeriod);
    return new Date() > expirationDate;
  }

  markAsExpired(): void {
    if (this.isFileExpired()) {
      this.imageUrl = null;
    }
  }
}
