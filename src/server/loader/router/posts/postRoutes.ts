import { Router } from "express";
import { PostsController } from "../../../loader/controller/posts/postsControl.js";
import { PostUseCase } from "../../userrepo/posts/PostUseCase.js";
import SequelizePostRepo from "../../userrepo/posts/SequelizePostRepo.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";

const router = Router();

// ** Initialize dependencies ** //
const postRepository = new SequelizePostRepo();
const userRepository = new SequelizeUserRepo();
const jwtHandler = new JwtTokenService();

// ****************************************************************************************** //

// ** Post Use Case ** //
const postUseCase = new PostUseCase(postRepository, userRepository, jwtHandler);
const postsController = new PostsController(postUseCase);

// Define route for creating a post
router.post("/create-post", (req, res) => postsController.createPost(req, res));

export default router;
