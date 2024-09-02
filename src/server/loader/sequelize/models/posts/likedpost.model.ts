import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";
import posts from "../posts/posts.model.js";
import users from "../usermodels/users.model.js";

// ** Define the Like Interface
interface LikeAttributes {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
}

interface LikeCreationAttributes extends Optional<LikeAttributes, "id"> {
  user_id: number;
  post_id: number;
  created_at: Date;
}

// ** Define Instance of Sequelize
const sequelize = sequelizeConInstance();

class liked_posts
  extends Model<LikeAttributes, LikeCreationAttributes>
  implements LikeAttributes
{
  declare id: number;
  declare user_id: number;
  declare post_id: number;
  declare created_at: Date;

  // ** create a static method to create a new like
  static async createLike(
    attributes: LikeCreationAttributes,
  ): Promise<liked_posts> {
    return await this.create(attributes);
  }
}

// ** Initialize the Like Model
liked_posts.init(
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "liked_posts",
    timestamps: false,
    freezeTableName: true,
  },
);

// ** Define the relationship between User and Like
users.hasMany(liked_posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// ** Define the relationship between Post and Like
liked_posts.belongsTo(users, {
  foreignKey: "user_id",
});

// ** Define the relationship between Post and Like
posts.hasMany(liked_posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

liked_posts.belongsTo(posts, {
  foreignKey: "post_id",
});

// ** Sync the Like model with the database
liked_posts
  .sync({ alter: false })
  .then(() => {
    console.log("Like synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing like:", err);
  });

export default liked_posts;
