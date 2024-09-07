import { DataTypes, Model, Optional } from "sequelize";
import { generateAvatarUrl } from "../../../utils/avatar.js";
import { sequelizeConInstance } from "../../sequelizeCon.js";
import users from "../usermodels/users.model.js";

interface UserRegistrationsAttributes {
  id: number;
  new_user: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

interface UserRegistrationsCreationAttributes
  extends Optional<UserRegistrationsAttributes, "id"> {}

const sequelize = sequelizeConInstance();

class user_registrations
  extends Model<
    UserRegistrationsAttributes,
    UserRegistrationsCreationAttributes
  >
  implements UserRegistrationsAttributes
{
  declare id: number;
  declare new_user: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare created_at: Date;
}

user_registrations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    new_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "user_registrations",
    freezeTableName: true,
    timestamps: false,
  },
);

user_registrations.afterCreate(
  async (user: user_registrations & { new_user: string }) => {
    try {
      if (user) {
        const spaceIndex = user.new_user.indexOf(" ");
        const firstName =
          spaceIndex !== -1
            ? user.new_user.slice(0, spaceIndex)
            : user.new_user;
        const lastName =
          spaceIndex !== -1 ? user.new_user.slice(spaceIndex + 1) : "";
        const avatar = generateAvatarUrl(firstName, lastName);

        await users.upsert({
          first_name: firstName,
          last_name: lastName,
          username: user.username,
          email: user.email,
          password: user.password,
          reset_password_token: "",
          reset_password_expires: new Date(),
          status: "active",
          bio: "Write something about yourself",
          joined_date: new Date(),
          last_login: new Date(),
          last_logout: new Date(),
          last_activity: new Date(),
          role: "user",
          avatarUrl: avatar,
          profile_picture: avatar,
          user_registration_id: user.id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  },
);

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("UserRegistration table created successfully");
  })
  .catch((err: Error) => {
    console.error("Error creating UserRegistration table:", err);
  });

export default user_registrations;
