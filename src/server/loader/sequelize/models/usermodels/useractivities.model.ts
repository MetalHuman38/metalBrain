import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";

// ** Define user activities Interface ** //
interface UserActivitiesAttributes {
  id: number;
  user_id: number;
  activity: string;
  activity_type: string;
  created_at: Date;
  metadata: string;
}

// ** Define Instance of Sequelize ** //
const sequelize = sequelizeConInstance();

// ** Define Instance of Sequelize ** //
interface UserActivitiesCreationAttributes
  extends Optional<
    UserActivitiesAttributes,
    "id" | "user_id" | "activity" | "activity_type" | "created_at" | "metadata"
  > {
  id: number;
  user_id: number;
  activity: string;
  activity_type: string;
  created_at: Date;
  metadata: string;
}

// ** Define the UserActivities Model ** //
class user_activities extends Model<
  UserActivitiesAttributes,
  UserActivitiesCreationAttributes
> {
  declare id: number;
  declare user_id: number;
  declare activity: string;
  declare activity_type: string;
  declare created_at: Date;
  declare metadata: string;
}

// ** Define the UserActivities Model ** //
user_activities.init(
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
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_type: {
      type: DataTypes.ENUM(
        "post",
        "comment",
        "user",
        "message",
        "notification",
        "reaction",
        "report",
        "block",
        "mute",
        "unblock",
        "unmute",
        "unreaction",
        "unreport"
      ),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {
        post_id: null,
        comment_id: null,
        user_id: null,
        message_id: null,
        notification_id: null,
        reaction_id: null,
        report_id: null,
        block_id: null,
        mute_id: null,
        unblock_id: null,
        unmute_id: null,
        unreaction_id: null,
        unreport_id: null,
      },
    },
  },
  {
    sequelize,
    modelName: "user_activities",
    timestamps: false,
    freezeTableName: true,
  }
);

// ** Sync the UserActivities Model ** //
await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("New user_activities synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing user_activities Table:", err);
  });

export default user_activities;
