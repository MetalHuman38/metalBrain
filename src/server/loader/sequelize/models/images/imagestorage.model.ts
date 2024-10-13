import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";
import posts from "../posts/posts.model.js";

// ** Define the ImageStorage Interface
interface ImageStorageAttributes {
  id: number;
  imageUrl: string | null;
  image_id: number | null;
  post_id: number | null;
  created_at: Date;
  creator_id: number;
}

// ** Define the ImageStorage Creation Attributes
interface ImageStorageCreationAttributes
  extends Optional<ImageStorageAttributes, "id"> {
  imageUrl: string | null;
  image_id: number | null;
  post_id: number | null;
  created_at: Date;
}

// ** Define Instance of Sequelize
const sequelize = sequelizeConInstance();

// ** Define the ImageStorage Model
class image_storages
  extends Model<ImageStorageAttributes, ImageStorageCreationAttributes>
  implements ImageStorageAttributes
{
  declare id: number;
  declare imageUrl: string | null;
  declare image_id: number | null;
  declare post_id: number | null;
  declare created_at: Date;
  declare creator_id: number;

  // create a static method to find an image by ID
  static async findImageById(id: number): Promise<image_storages | null> {
    return await this.findByPk(id);
  }

  static async findImageByReferenceKey(
    key: string,
    value: number
  ): Promise<image_storages | null> {
    try {
      const image = await this.findOne({
        where: { [key]: value },
        order: [["created_at", "DESC"]],
      });
      return image;
    } catch (error) {
      console.error(
        `Error finding image by reference key: ${key}, value: ${value}`,
        error
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

// ** Define the ImageStorage Model
image_storages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "posts",
        key: "id",
      },
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "image_storages",
    timestamps: false,
    freezeTableName: true,
  }
);

posts.hasMany(image_storages, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

image_storages.belongsTo(posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// ** sync the ImageStorage model with the database
await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("New Image synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing new image:", err);
  });

export default image_storages;
