import { Request, Response } from "express";
import { UploadImageUseCase } from "../../userrepo/upload/UploadImageUseCase.js";
import { VerifyUserUseCase } from "../../userrepo/userUseCases.js";
// ** Class to handle the logic and behavior of uploading images controller ** //
export class UploadController {
  constructor(
    private uploadImageUseCase: UploadImageUseCase,
    private verifyUserUseCase: VerifyUserUseCase
  ) {}

  // ** Method to upload images ** //
  async uploadImages(req: Request, res: Response): Promise<void> {
    try {
      console.log("Uploading images", req.file);
      console.log("Uploading images", req.body);

      // const { imageUrl } = req.body;
      // if (!imageUrl) {
      //   throw new Error("No image found");
      // }
      const relativePath = `assets/images/${req.file?.filename}`;

      const token = req.cookies.token;
      if (!token) {
        throw new Error("Unauthorized");
      }

      const decodedToken = await this.verifyUserUseCase.VerifyUser(token);
      if (!decodedToken) {
        throw new Error("Unauthorized");
      }

      const creator_id = decodedToken.id;

      const uploadedImages = await this.uploadImageUseCase.uploadImages({
        imageUrl: relativePath,
        creator_id: creator_id as number,
        created_at: new Date(),
      });

      res.status(200).json({ images: uploadedImages });
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to delete images ** //
  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      console.log("Deleting image", req.body);

      const { id } = req.body;
      if (!id) {
        throw new Error("No image found");
      }

      const token = req.cookies.token;
      if (!token) {
        throw new Error("Unauthorized");
      }

      const decodedToken = await this.verifyUserUseCase.VerifyUser(token);
      if (!decodedToken) {
        throw new Error("Unauthorized");
      }

      const creator_id = decodedToken.id;

      await this.uploadImageUseCase.deleteImage({
        id,
        creator_id: creator_id as number,
        imageUrl: null,
        created_at: new Date(),
      });

      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }
}

export default {
  UploadController,
};
