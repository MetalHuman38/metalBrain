import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { CreatePostValidation } from "@/client/services/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/components/hooks/use-toast";
import { useCreatePostHandler } from "@/client/components/hooks/use-createpost";

import { PostFormProps } from "./formProps";
import ImageUploader from "@/client/components/shared/upload/ImageUploader";
import useUpdatePostHandler from "@/client/components/hooks/use-updatepost";
import { IUser } from "@/client/services/entities/user";

const PostForm = ({ post, action }: PostFormProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handlePostCreation, token } = useCreatePostHandler();
  const { handleUpdatePost } = useUpdatePostHandler();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: post?.caption || "",
      file: [],
      location: post?.location || "",
      tags: Array.isArray(post?.tags) ? post.tags.join(",") : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreatePostValidation>) => {
    setLoading(true);
    try {
      if (post && "action === 'update'") {
        handleUpdatePost({
          id: post.id,
          caption: data.caption,
          imageUrl: post.imageUrl,
          location: data.location,
          tags: Array.isArray(data.tags) ? data.tags.join(",") : data.tags,
          likes_count: post.likes_count,
          creator_id: post.creator_id,
          created_at: post.created_at,
          updated_at: new Date(),
          user: user as IUser,
        });
        toast({
          title: "Post updated successfully",
        });
        navigate("/");
        return;
      }

      const newPost = await handlePostCreation(
        {
          id: post?.id,
          caption: data.caption,
          imageUrl: post?.imageUrl || null,
          location: data.location,
          tags: Array.isArray(data.tags) ? data.tags.join(",") : data.tags,
          likes_count: 0,
          comment_count: 0,
          creator_id: Number(user?.id),
          created_at: new Date(),
          updated_at: new Date(),
          user: user as IUser,
          isLiked: false,
          isSaved: false,
        },
        token as string
      );
      if (!newPost) {
        throw new Error("Post not created");
      }
      toast({
        title: "Post created successfully",
      });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error creating post",
        });
      } else {
        toast({
          title: "Error creating post",
          description: "An unknown error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        method="post"
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write a caption..."
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="fileInput" className="shad-form_label">
                {" "}
                Add Photo
              </FormLabel>
              <FormControl>
                <ImageUploader
                  fieldChange={field.onChange}
                  mediaUrl={post ? `/${post.imageUrl}` : ""}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex shad-form_label">
                Add Location
              </FormLabel>
              <FormControl>
                <input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex shad-form_label">
                Add Tags (separated by comma " , "){" "}
              </FormLabel>
              <FormControl>
                <input
                  type="text"
                  className="shad-input"
                  placeholder="e.g. #travel, #nature, #photography"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
