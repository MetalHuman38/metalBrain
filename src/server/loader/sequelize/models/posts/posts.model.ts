import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";
import users from "../usermodels/users.model.js";

interface PostAttributes {
  id: number;
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  creator_id: number;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  creator_id: number;
  created_at: Date;
  updated_at: Date;
}

// Define Instance of Sequelize
const sequelize = sequelizeConInstance();

class posts extends Model<PostAttributes, PostCreationAttributes> {
  declare id: number;
  declare caption: string;
  declare imageUrl: string | null;
  declare location: string | null;
  declare tags: string;
  declare likes_count: number | null;
  declare creator_id: number;
  declare created_at: Date | undefined;
  declare updated_at: Date | undefined;

  // create a static method to create a new post
  static async createPost(attributes: PostCreationAttributes): Promise<posts> {
    return await this.create(attributes);
  }

  static async updatePost(
    id: number,
    attributes: PostAttributes
  ): Promise<[number, posts[]]> {
    const [affectedCount, updatedPosts] = await this.update(attributes, {
      where: { id },
      returning: true,
    });
    return [affectedCount, updatedPosts as posts[]];
  }

  // declare static methods to delete a Post by ID
  static async deletePost(id: number): Promise<void> {
    const post = await this.findOne({ where: { id } });
    if (post) {
      await post.destroy();
    }
  }

  // declare static methods to get all posts
  static async getAllPosts(): Promise<posts[]> {
    return await this.findAll();
  }

  // declare static methods to get infinite posts
  static async getInfinitePosts(
    offset: number,
    limit: number
  ): Promise<posts[]> {
    return await this.findAll({ offset, limit });
  }

  // declare static methods to get post by ID
  static async getPostByID(post_id: number): Promise<posts | null> {
    return await this.findOne({ where: { id: post_id } });
  }

  // declare static methods to get user's posts
  static async getUserPosts(user_id: number): Promise<posts[]> {
    return await this.findAll({ where: { creator_id: user_id } });
  }

  // declare static methods to get Saved post by post ID
  static async getSavedPost(post_id: number): Promise<posts | null> {
    return await this.findOne({ where: { id: post_id } });
  }

  // declare static methods to get post by reference ID (creator_Id)
  static async getPostByReferenceID(creator_id: number): Promise<posts | null> {
    return await this.findOne({ where: { creator_id } });
  }
}

// Sync the model with the database
posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "posts",
    timestamps: false,
    freezeTableName: true,
  }
);

// Create new post
posts.createPost = async function (
  attributes: PostCreationAttributes
): Promise<posts> {
  try {
    const newPost = await this.create(attributes);
    return newPost;
  } catch (error) {
    console.error("Error creating new post:", error);
    throw error;
  }
};

// Update post by ID
posts.updatePost = async function (
  id: number,
  attributes: PostAttributes
): Promise<[number, posts[]]> {
  try {
    const [affectedCount, updatedPosts] = await this.update(attributes, {
      where: { id },
      returning: true,
    });
    return [affectedCount, updatedPosts as posts[]];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// infinite posts
posts.getInfinitePosts = async function (
  offset: number,
  limit: number
): Promise<posts[]> {
  try {
    const posts = await this.findAll({ offset, limit });
    return posts;
  } catch (error) {
    console.error("Error getting infinite posts:", error);
    throw error;
  }
};

// Get search results - posts
posts.getPostByID = async function (id: number): Promise<posts | null> {
  try {
    const post = await this.findOne({ where: { id } });
    return post;
  } catch (error) {
    console.error("Error getting post by ID:", error);
    throw error;
  }
};

// Get user's posts
posts.getUserPosts = async function (user_id: number): Promise<posts[]> {
  try {
    const posts = await this.findAll({ where: { creator_id: user_id } });
    return posts;
  } catch (error) {
    console.error("Error getting user posts:", error);
    throw error;
  }
};

// Define the relationship between the User and Post models
users.hasMany(posts, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

posts.belongsTo(users, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Post synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing Post:", err);
  });

export default posts;
