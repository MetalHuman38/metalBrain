import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";

// ** Define Admin Interface ** //
interface AdminAttributes {
  id: number;
  new_admin: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}

// ** Define Admin Creation Interface ** //
interface AdminCreationAttributes extends Optional<AdminAttributes, "id"> {
  new_admin: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}

// ** Define Instance of Sequelize ** //
const sequelize = sequelizeConInstance();

// ** Define Admin Model ** //
class admins extends Model<AdminAttributes, AdminCreationAttributes> {
  declare id: number;
  declare new_admin: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare created_at: Date;
}

// ** Initialize Admin Model ** //
admins.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    new_admin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: async (value: string) => {
          const user = await admins.findOne({
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
          const user = await admins.findOne({
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
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "admins",
    freezeTableName: true,
    timestamps: false,
  }
);

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("admin synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing Post:", err);
  });

// ** Export Admin Model ** //
export default admins;
