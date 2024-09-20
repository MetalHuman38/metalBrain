import express from "express";
import { SequelizeFollowRepo } from "../../userrepo/follow/SequelizeFollowRepo.js";
import { FollowUseCase } from "../../userrepo/follow/FollowUseCase.js";
import { FollowController } from "../../controller/user/follow.js";

const router = express.Router();

// ** Initialize dependencies ** //
const followRepo = new SequelizeFollowRepo();
const followUseCase = new FollowUseCase(followRepo);
const followController = new FollowController(followUseCase);

// ** Bind the methods to the controller instance ** //

// ** Follow routes ** //
router.post("/follow", followController.followUser.bind(followController));

// ** Unfollow routes ** //
router.delete(
  "/unfollow",
  followController.unfollowUser.bind(followController)
);

// ** Block routes ** //
router.put("/block", followController.blockUser.bind(followController));

// ** Unblock routes ** //
router.put("/unblock", followController.unblockUser.bind(followController));

// ** Get followers routes ** //
router.get("/followers", followController.getFollowers.bind(followController));

// ** Get following routes ** //
router.get("/following", followController.getFollowing.bind(followController));

// ** Get status routes ** //
router.get("/status", followController.getStatus.bind(followController));

// ** Update follow status routes ** //
router.put(
  "/updatestatus",
  followController.updateFollowStatus.bind(followController)
);

export default router;
