import { useEffect, useState } from "react";
import Loader from "../Loader";
import { PostStatsProps } from "./interface";
import { useLikePostHandler } from "@/client/components/hooks/use-likepost";
import { useSavePostHandler } from "@/client/components/hooks/use-savepost";
import { useUnLikePostHandler } from "@/client/components/hooks/use-unlikepost";
import { useUnSavePostHandler } from "@/client/components/hooks/use-unsavepost";
import { CommentModal } from "@/client/components/shared/modal";

const PostStats = ({ post }: PostStatsProps) => {
  const { handlePostLiking } = useLikePostHandler();
  const { handlePostUnLiking } = useUnLikePostHandler();
  const { handlePostSaving } = useSavePostHandler();
  const { handlePostUnSaving } = useUnSavePostHandler();

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLikingPost, setIsLikingPost] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    setIsLiked(!!post.isLiked);
    setIsSaved(!!post.isSaved);
  }, [post.isLiked, post.isSaved]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLikingPost(true);
    try {
      if (isLiked) {
        await handlePostUnLiking({
          post_id: post.id,
          user_id: post.user.id,
        });
      } else {
        await handlePostLiking({
          post_id: post.id,
          user_id: post.user.id,
        });
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLikingPost(false);
    }
  };

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSavingPost(true);
    try {
      if (isSaved) {
        await handlePostUnSaving({ post_id: post.id, user_id: post.user.id });
      } else {
        await handlePostSaving({ post_id: post.id, user_id: post.user.id });
      }
      setIsSaved((prev) => !prev);
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  return (
    <div className="flex gap-10 items-center z-20">
      <div className="flex gap-2 mr-5">
        {isLikingPost ? (
          <Loader />
        ) : (
          <img
            src={isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
            alt="like"
            className="cursor-pointer"
            onClick={handleLikeToggle}
            loading="lazy"
            width={24}
            height={24}
          />
        )}
        <p className="small-medium lg:base-medium">{post.likes_count}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save"
            className="cursor-pointer"
            onClick={handleSaveToggle}
            loading="lazy"
            width={24}
            height={24}
          />
        )}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <img
          src="/assets/icons/chat.svg"
          alt="comment"
          className="cursor-pointer"
          onClick={handleCommentClick}
          id="comment"
          loading="lazy"
          width={24}
          height={24}
        />
        <p className="small-medium lg:base-medium">{post.comment_count}</p>
      </div>
      <div className="flex gap-2">
        <img
          src="/assets/icons/share.svg"
          alt="share"
          className="cursor-pointer"
          loading="lazy"
          width={24}
          height={24}
        />
      </div>
      {isCommentModalOpen && (
        <div>
          <CommentModal
            post_id={post.id ?? 0}
            user_id={Number(post.user?.id) ?? 0}
            isOpen={isCommentModalOpen}
            onClose={() => setIsCommentModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PostStats;
