import { Transaction } from "sequelize";
import { sequelizeConInstance } from "../../sequelize/sequelizeCon.js";
import { IUploadImagesRepository } from "./IUploadImageRepository.js";
import image_storages from "../../sequelize/models/images/imagestorage.model.js";
import { IUploadImage } from "./interface.js";

// ** Sequelize Image Upload Repository ** //
export class SequelizeImageUpload implements IUploadImagesRepository {
  async uploadImages(image: IUploadImage): Promise<image_storages> {
    // ** Create Instance of Sequelize ** //
    const sequelize = sequelizeConInstance();
    return sequelize.transaction(async (t: Transaction) => {
      try {
        // ** Create Image ** //
        const images = await image_storages.create(image, { transaction: t });
        if (!images) {
          throw new Error("Image not uploaded");
        }
        return images;
      } catch (error) {
        console.error("Error uploading images", error);
        throw error;
      }
    });
  }

  // ** Delete Image ** //
  async deleteImage(image: IUploadImage): Promise<void> {
    // ** Create Instance of Sequelize ** //
    const sequelize = sequelizeConInstance();
    return sequelize.transaction(async (t: Transaction) => {
      try {
        // ** Delete Image ** //
        await image_storages.destroy({
          where: { id: image.id },
          transaction: t,
        });
      } catch (error) {
        console.error("Error deleting image", error);
        throw error;
      }
    });
  }
}
