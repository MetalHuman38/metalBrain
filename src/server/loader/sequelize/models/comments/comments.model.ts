import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";

interface CommentAttributes {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  like_count: number | null;
  status: string;
  is_edited: boolean;
  edited_at: Date | null;
  content: string;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  like_count: number | null;
  status: string;
  is_edited: boolean;
  edited_at: Date | null;
  content: string;
  created_at: Date;
  updated_at: Date;
}

// Define Instance of Sequelize
const sequelize = sequelizeConInstance();

class comments
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes {
  declare id: number;
  declare user_id: number;
  declare post_id: number;
  declare parent_comment_id: number | null;
  declare like_count: number | null;
  declare status: string;
  declare is_edited: boolean;
  declare edited_at: Date | null;
  declare content: string;
  declare created_at: Date | undefined;
  declare updated_at: Date | undefined;
}

comments.init(
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
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "comments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "deleted", "flagged"),
      defaultValue: "active",
      allowNull: false,
    },
    is_edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    edited_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "comments",
    freezeTableName: true,
    timestamps: false,
  }
);

comments
  .sync({ alter: false })
  .then(() => {
    console.log("comments synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing comments:", err);
  });

export default comments;
