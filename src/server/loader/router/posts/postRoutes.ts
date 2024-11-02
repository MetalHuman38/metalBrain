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

export default router;
