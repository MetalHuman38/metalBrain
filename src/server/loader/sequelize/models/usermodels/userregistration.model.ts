import bcrypt from "bcrypt";
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
  extends Optional<UserRegistrationsAttributes, "id"> {
  new_user: string;
  username: string;
  email: string;
  password: string;
}

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

  // ** Declare the static method loginUser ** //
  static async loginUser(
    email: string,
    password: string,
  ): Promise<user_registrations | null> {
    return await this.findOne({ where: { email: email, password: password } });
  }

  // ** Declare the static method logout user ** //
  static async logoutUser(email: string): Promise<void> {
    try {
      await this.findOne({ where: { email: email } });
    } catch (error) {
      console.error("Error logging out user:", error);
      throw new Error("Error logging out user");
    }
  }
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
    tableName: "UserRegistration",
    freezeTableName: true,
    timestamps: false,
  },
);

user_registrations.beforeCreate(async (user: user_registrations) => {
  try {
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }
  } catch (error) {
    console.error("Error hashing password", error);
    throw new Error("Error hashing password");
  }
});

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
          firstName: firstName,
          lastName: lastName,
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

user_registrations.loginUser = async function (
  email: string,
  password: string,
): Promise<user_registrations | null> {
  try {
    const user = await this.findOne({ where: { email: email } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Error logging in user");
  }
};

user_registrations.logoutUser = async function (email: string): Promise<void> {
  try {
    await this.findOne({ where: { email: email } });
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new Error("Error logging out user");
  }
};

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("UserRegistration table created successfully");
  })
  .catch((err: Error) => {
    console.error("Error creating UserRegistration table:", err);
  });

export default user_registrations;
