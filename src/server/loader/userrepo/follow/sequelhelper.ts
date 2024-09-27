import follows from "../../sequelize/models/usermodels/follow.model.js";
import follow_counts from "../../sequelize/models/usermodels/followcount.model.js";
import { sequelizeConInstance } from "../../sequelize/sequelizeCon.js";
import { Transaction } from "sequelize";

const sequelize = sequelizeConInstance();

// ** Helper Method to update Follow Status ** //
async function updateFollowStatus(
  follower_id: number,
  following_id: number
): Promise<void> {
  return sequelize.transaction(async (t: Transaction) => {
    await follows.update(
      { status: "following" },
      {
        where: { follower_id: follower_id, following_id: following_id },
        transaction: t,
      }
    );
  });
}

// ** Helper function to Find Follow Counts ** //
async function findFollowCounts(
  user_id: number,
  t: Transaction
): Promise<number> {
  return follow_counts.count({
    where: { user_id: user_id },
    transaction: t,
  });
}

// ** helper function to upsert follow counts ** //
async function upsertFollowCounts(
  user_id: number,
  follower_count: number,
  following_count: number,
  t: Transaction
): Promise<void> {
  await follow_counts.upsert(
    {
      user_id: user_id,
      follower_count: follower_count,
      following_count: following_count,
      created_at: new Date(),
      updated_at: new Date(),
    },
    { transaction: t }
  );
}

// ** Helper function to Increment Follower Count ** //
async function incrementFollowerCount(
  user_id: number,
  t: Transaction
): Promise<void> {
  await follow_counts.increment(
    { follower_count: 1 },
    { where: { user_id: user_id }, transaction: t }
  );
}

// ** Helper function to Increment Following Count ** //
async function incrementFollowingCount(
  user_id: number,
  t: Transaction
): Promise<void> {
  await follow_counts.increment(
    { following_count: 1 },
    { where: { user_id: user_id }, transaction: t }
  );
}

export default {
  updateFollowStatus,
  findFollowCounts,
  upsertFollowCounts,
  incrementFollowerCount,
  incrementFollowingCount,
};
