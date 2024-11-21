import { Router } from "express";
import { PostsController } from "../../../loader/controller/posts/postsControl.js";
import { PostUseCase } from "../../userrepo/posts/PostUseCase.js";
import SequelizePostRepo from "../../userrepo/posts/SequelizePostRepo.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";
import { VerifyUserUseCase } from "../../userrepo/userUseCases.js";

const router = Router();

// ** Initialize dependencies ** //
const postRepository = new SequelizePostRepo();
const userRepository = new SequelizeUserRepo();
const jwtTokenService = new JwtTokenService();

// ****************************************************************************************** //

// ** Post Use Case ** //
const verifyUserUseCase = new VerifyUserUseCase(
  userRepository,
  jwtTokenService
);
const postUseCase = new PostUseCase(postRepository, verifyUserUseCase);
const postsController = new PostsController(postUseCase);

// ** Define route for creating a post ** //
router.post("/create-post", (req, res) => postsController.createPost(req, res));

// ** Define route for updating a post ** //
router.put("/update-post", (req, res) => postsController.updatePost(req, res));

// ** Define route for get post by id ** //
router.get("/get-post", (req, res) => postsController.getPostById(req, res));

// ** Define route for get recent post ** //
router.get("/get-recent-post", (req, res) =>
  postsController.getRecentPost(req, res)
);

// ** Define route to save a post ** //
router.post("/save-post", (req, res) => postsController.savePost(req, res));

// ** Define route to unsave a post ** //
router.delete("/unsave-post", (req, res) =>
  postsController.unSavePost(req, res)
);

// ** Define route to get saved posts ** //
router.get("/get-saved-posts", (req, res) =>
  postsController.getAllSavedPosts(req, res)
);

// ** Define route to like a post ** //
router.post("/like-post", (req, res) => postsController.likePost(req, res));

// ** Define route to unlike a post ** //
router.delete("/unlike-post", (req, res) =>
  postsController.unLikePost(req, res)
);

export default router;
