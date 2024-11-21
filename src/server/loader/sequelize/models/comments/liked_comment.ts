import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";
import users from "../usermodels/users.model.js";
import comments from "./comments.model.js";

interface LikedCommentAttributes {
  id: number;
  user_id: number;
  comment_id: number;
  created_at: Date;
}

interface LikedCommentCreationAttributes
  extends Optional<LikedCommentAttributes, "id"> {
  user_id: number;
  comment_id: number;
  created_at: Date;
}

// ** Define Instance of Sequelize ** //
const sequelize = sequelizeConInstance();

class liked_comments
  extends Model<LikedCommentAttributes, LikedCommentCreationAttributes>
  implements LikedCommentAttributes
{
  declare id: number;
  declare user_id: number;
  declare comment_id: number;
  declare created_at: Date;

  // ** create a static method to create a new like ** //
  static async createLike(
    attributes: LikedCommentCreationAttributes
  ): Promise<liked_comments> {
    return await this.create(attributes);
  }
}

// ** Initialize the Like Model ** //
liked_comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "comments",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "liked_comments",
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "comment_id"],
      },
    ],
  }
);

users.hasMany(liked_comments, {
  foreignKey: "user_id",
});
liked_comments.belongsTo(users, {
  foreignKey: "user_id",
});

comments.hasMany(liked_comments, { foreignKey: "comment_id" });
liked_comments.belongsTo(comments, { foreignKey: "comment_id" });

// ** Sync Model with DB ** //
liked_comments
  .sync({ force: false })
  .then(() => {
    console.log("Like comment synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing liked comment:", err);
  });

export default liked_comments;
