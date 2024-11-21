// ** This file contains comments related API calls using custom hooks ** //
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  useCreateComment,
  useUpdateComment,
  useCreateReply,
  useDeleteComment,
  useLikeComment,
  useUnlikeComment,
} from "@/client/services/react-query/comments/CommentQueryMutation";
import {
  IComment,
  ICreateComment,
} from "@/client/services/react-query/comments/interface";

// ** Set up a robust hook to handle comment creation ** //
export const useCreateCommentHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createCommentAsync } = useCreateComment();
  const { mutateAsync: updateCommentAsync } = useUpdateComment();
  const { mutateAsync: deleteCommentAsync } = useDeleteComment();
  const { mutateAsync: likeCommentAsync } = useLikeComment();
  const { mutateAsync: unlikeCommentAsync } = useUnlikeComment();
  const { mutateAsync: createReplyAsync } = useCreateReply();
  const [comment, setComment] = useState<IComment | null>(null);

  // ** Handle comment creation ** //
  const handleCommentCreation = useCallback(
    async (comment: ICreateComment): Promise<IComment | null> => {
      try {
        const data = await createCommentAsync(comment, {
          onSuccess: (data) => {
            setComment(data);
            queryClient.invalidateQueries({ queryKey: ["comments"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error creating comment", error);
        return null;
      }
    },
    [createCommentAsync, queryClient]
  );

  // ** Handle comment update ** //
  const handleCommentUpdate = useCallback(
    async (comment: IComment): Promise<IComment | null> => {
      try {
        const data = await updateCommentAsync(comment, {
          onSuccess: (data) => {
            setComment(data);
            queryClient.invalidateQueries({ queryKey: ["comments"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error updating comment", error);
        return null;
      }
    },
    [updateCommentAsync, queryClient]
  );

  // ** Handle create comment reply ** //
  const handleCreateReply = useCallback(
    async (reply: ICreateComment): Promise<IComment | null> => {
      try {
        const data = await createReplyAsync(reply, {
          onSuccess: (data) => {
            setComment(data);
            queryClient.invalidateQueries({ queryKey: ["comments"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error creating reply", error);
        return null;
      }
    },
    [createReplyAsync, queryClient]
  );

  // ** Handle comment deletion ** //
  const handleCommentDeletion = useCallback(
    async (id: number): Promise<IComment | null> => {
      try {
        await deleteCommentAsync(id, {
          onSuccess: () => {
            setComment(null);
            queryClient.invalidateQueries({ queryKey: ["comments"] });
          },
        });
        return null;
      } catch (error) {
        console.error("Error deleting comment", error);
        return null;
      }
    },
    [deleteCommentAsync, queryClient]
  );

  // ** Handle comment like ** //
  const handleCommentLike = useCallback(
    async (id: number, user_id: number): Promise<IComment | null> => {
      try {
        const data = await likeCommentAsync(
          { id, user_id },
          {
            onSuccess: (data) => {
              setComment(data);
              queryClient.invalidateQueries({ queryKey: ["comments"] });
            },
          }
        );
        return data;
      } catch (error) {
        console.error("Error liking comment", error);
        return null;
      }
    },
    [likeCommentAsync, queryClient]
  );

  // ** Handle comment unlike ** //
  const handleCommentUnlike = useCallback(
    async (id: number, user_id: number): Promise<IComment | null> => {
      try {
        const data = await unlikeCommentAsync(
          { id, user_id },
          {
            onSuccess: (data) => {
              setComment(data);
              queryClient.invalidateQueries({ queryKey: ["comments"] });
            },
          }
        );
        return data;
      } catch (error) {
        console.error("Error unliking comment", error);
        return null;
      }
    },
    [unlikeCommentAsync, queryClient]
  );

  //

  return {
    comment,
    setComment,
    handleCommentCreation,
    handleCommentUpdate,
    handleCommentDeletion,
    handleCommentLike,
    handleCommentUnlike,
    handleCreateReply,
  };
};
