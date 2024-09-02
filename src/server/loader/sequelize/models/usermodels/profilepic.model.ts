import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";
import users from "../usermodels/users.model.js";

const sequelize = sequelizeConInstance();

interface ProfilePictureAttributes {
  id: number;
  user_id: number;
  profile_pic: string;
  created_at: Date;
  updated_at: Date;
}

interface ProfilePictureCreationAttributes
  extends Optional<ProfilePictureAttributes, "id"> {
  user_id: number;
  profilePic: string;
}

class profile_pictures extends Model<
  ProfilePictureAttributes,
  ProfilePictureCreationAttributes
> {
  declare id: number;
  declare user_id: number;
  declare profilePic: string;
  declare created_at?: Date;
  declare updated_at?: Date;

  // create a static method to find a profile picture by ID
  static async findProfilePictureById(
    user_id: number,
  ): Promise<profile_pictures | null> {
    return await this.findByPk(user_id);
  }

  // ** create a static method to retireve a profile picture by reference ID(user_id)
  static async getProfilePicByReferenceID(
    user_id: number,
  ): Promise<profile_pictures | null> {
    return await this.findOne({ where: { user_id } });
  }

  static async findProfilePicByReferenceKey(
    key: string,
    value: number,
  ): Promise<profile_pictures | null> {
    try {
      const profileImage = await this.findOne({
        where: { [key]: value },
        order: [["created_at", "DESC"]],
      });
      return profileImage;
    } catch (error) {
      console.error(
        `Error finding profile image by reference key: ${key}, value: ${value}`,
        error,
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

profile_pictures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Name of the users table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "profile_pictures",
    timestamps: false,
    freezeTableName: true,
  },
);

// Define the association between User and ProfilePicture
users.hasOne(profile_pictures, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
profile_pictures.belongsTo(users, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

profile_pictures
  .sync({ alter: false })
  .then(() => {
    console.log("Profile Pic synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing creating profile pic table:", err);
  });

export default profile_pictures;
