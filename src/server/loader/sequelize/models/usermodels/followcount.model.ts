import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";

// ** Define the followCount Interface ** //
interface FollowCountAttributes {
  user_id: number;
  follower_count: number;
  following_count: number;
  created_at: Date; // Date the followCount was created
  updated_at: Date; // Date the followCount was updated
}

interface FollowCountCreationAttributes
  extends Optional<
    FollowCountAttributes,
    | "user_id"
    | "follower_count"
    | "following_count"
    | "created_at"
    | "updated_at"
  > {
  user_id: number;
  follower_count: number;
  following_count: number;
  created_at: Date; // Date the followCount was created
  updated_at: Date; // Date the followCount was updated
}

// ** Define Instance of Sequelize ** //
const sequelize = sequelizeConInstance();

// ** Define the FollowCount Model ** //
class follow_counts extends Model<
  FollowCountAttributes,
  FollowCountCreationAttributes
> {
  declare user_id: number;
  declare follower_count: number;
  declare following_count: number;
  declare created_at: Date;
  declare updated_at: Date;
}

// ** Define the follow_count Model ** //
follow_counts.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    follower_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "follow_counts",
    timestamps: false,
    freezeTableName: true,
  }
);

// ** Sync the follow_count model with the database ** //
await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("New follow_count synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing follow_count  Table:", err);
  });

export default follow_counts;
