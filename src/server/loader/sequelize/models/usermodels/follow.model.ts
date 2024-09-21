import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../../sequelizeCon.js";

// ** Define the follow Interface ** //
interface FollowAttributes {
  follower_id: number;
  following_id: number;
  created_at: Date; // Date the follow was created
  status: "follow" | "unfollow" | "following" | "block";
}

interface FollowCreationAttributes
  extends Optional<
    FollowAttributes,
    "follower_id" | "following_id" | "created_at" | "status"
  > {
  follower_id: number;
  following_id: number;
  created_at: Date; // Date the follow was created
  status: "follow" | "unfollow" | "following" | "block";
}

// ** Define Instance of Sequelize ** //
const sequelize = sequelizeConInstance();

// ** Define the Follow Model ** //
class follows extends Model<FollowAttributes, FollowCreationAttributes> {
  declare follower_id: number;
  declare following_id: number;
  declare created_at: Date;
  declare status: "follow" | "unfollow" | "following" | "block";
}

// ** Define the Follow Model ** //
follows.init(
  {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("follow", "unfollow", "following", "block"),
      allowNull: false,
      defaultValue: "follow",
    },
  },
  {
    sequelize,
    modelName: "follows",
    timestamps: false,
    hooks: {
      afterCreate: async (follow: FollowAttributes) => {
        if (follow.status === "follow") {
          await follows.update(
            { status: "following" },
            {
              where: {
                follower_id: follow.follower_id,
                following_id: follow.following_id,
              },
            }
          );
        }
      },
    },
    freezeTableName: true,
  }
);

// ** Sync the model with the database ** //
await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("New Follow synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing Follow Table:", err);
  });

export default follows;
