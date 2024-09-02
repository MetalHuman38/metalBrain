import { DataTypes, Model, Optional } from "sequelize";
import users from "../usermodels/users.model.js";
import { sequelizeConInstance } from "../../sequelizeCon.js";

// ** Define the UsersStories Interface ** //
interface UserStoriesAttributes {
  id: number;
  user_id: number;
  storyUrl: string;
  created_at: Date;
  expires_at: Date;
}

interface UserStoriesCreationAttributes
  extends Optional<UserStoriesAttributes, "id"> {
  user_id: number;
  storyUrl: string;
}

// ** Define Instance of Sequelize ** //
const sequelize = sequelizeConInstance();

// ** Define the UsersStories Model ** //
class user_stories extends Model<
  UserStoriesAttributes,
  UserStoriesCreationAttributes
> {
  declare id: number;
  declare user_id: number;
  declare storyUrl: string;
  declare created_at: Date;
  declare expires_at: Date;

  static async getUserStory(user_id: number): Promise<user_stories | null> {
    return await this.findOne({
      where: { user_id: user_id },
    });
  }

  static async updateStory(
    id: number,
    attributes: Partial<UserStoriesAttributes>,
  ): Promise<[number, user_stories[]]> {
    const [affectedCount, updatedStory] = await this.update(attributes, {
      where: { id },
      returning: true,
    });
    return [affectedCount, updatedStory as user_stories[]];
  }

  // ** Create a static method to update a story by reference ID ** //
  static async updateStoryByReferenceKey(
    key: string,
    value: number,
    update: Partial<UserStoriesAttributes>,
  ): Promise<user_stories | null> {
    try {
      const story = await this.findOne({
        where: { [key]: value },
      });
      if (!story) {
        return null;
      }
      await story.update(update);
      return story;
    } catch (error) {
      console.error(
        `Error updating story by reference key: ${key}, value: ${value}`,
        error,
      );
      throw error; // Re-throw the error after logging it
    }
  }

  // ** Create a static method to find a story by reference ID ** //
  static async findStoryByReferenceKey(
    key: string,
    value: number,
  ): Promise<user_stories | null> {
    try {
      const story = await this.findOne({
        where: { [key]: value },
        order: [["createdAt", "DESC"]],
      });
      return story;
    } catch (error) {
      console.error(
        `Error finding story by reference key: ${key}, value: ${value}`,
        error,
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

// ** Initialize the UsersStories Model ** //
user_stories.init(
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
    storyUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user_stories",
    timestamps: false,
    freezeTableName: true,
  },
);

user_stories.belongsTo(users, {
  foreignKey: "user_id",
  targetKey: "id",
});
users.hasMany(user_stories, {
  foreignKey: "user_id",
  sourceKey: "id",
});

// ** Sync the UsersStories Model ** //
await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("UsersStories model synced");
  })
  .catch((err) => {
    console.error("Error syncing UsersStories model:", err);
  });

export default user_stories;
