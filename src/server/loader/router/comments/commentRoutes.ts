import { Router } from "express";
import { CommentsController } from "../../../loader/controller/comments/commentController.js";
import { CommentUseCase } from "../../userrepo/comments/CommentUseCase.js";
import SequelizeCommentRepo from "../../userrepo/comments/SequelizeComRepo.js";

const router = Router();

// ** Initialize dependencies ** //
const commentRepository = new SequelizeCommentRepo();
// ****************************************************************************************** //
// ** Comment Use Case ** //
const commentUseCase = new CommentUseCase(commentRepository);
const commentsController = new CommentsController(commentUseCase);

// ** Define route for creating a comment ** //
router.post("/create-comment", (req, res) =>
  commentsController.createComment(req, res)
);

// ** Define route for updating a comment ** //
router.put("/update-comment", (req, res) =>
  commentsController.updateComment(req, res)
);

// ** Define route for get comment by id ** //
router.get("/get-comment/:id", (req, res) =>
  commentsController.getCommentById(req, res)
);

// ** Define route for get recent comments ** //
router.get("/get-recent-comments", (req, res) =>
  commentsController.getRecentComments(req, res)
);

// ** Define route for create reply ** //
router.post("/create-reply", (req, res) =>
  commentsController.createReply(req, res)
);

// ** Define route for get replies ** //
router.get("/get-replies/:id/reply", (req, res) =>
  commentsController.getCommentReplies(req, res)
);

// ** Define route for delete comment ** //
router.delete("/delete-comment/:id/comment", (req, res) =>
  commentsController.deleteComment(req, res)
);

// ** Define route for like comment ** //
router.post("/like-comment/:comment_id", (req, res) =>
  commentsController.likeComment(req, res)
);

// ** Define route for unlike comment ** //
router.delete("/unlike-comment/:comment_id", (req, res) =>
  commentsController.unLikeComment(req, res)
);

// ** Define route for get comment likes ** //
router.get("/get-comment-likes/:id/likes", (req, res) =>
  commentsController.getCommentLikes(req, res)
);

export default router;
