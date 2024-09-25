import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";

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
      validate: {
        isUnique: async (value: string) => {
          const user = await user_registrations.findOne({
            where: { username: value },
          });
          if (user) {
            throw new Error("Username already in use");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: async (value: string) => {
          const user = await user_registrations.findOne({
            where: { email: value },
          });
          if (user) {
            throw new Error("Email already in use");
          }
        },
      },
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
  }
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
