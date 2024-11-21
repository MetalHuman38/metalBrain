import posts from "../../sequelize/models/posts/posts.model.js";
import PostAttributes from "../../sequelize/models/posts/posts.model.js";
import image_storages from "../../sequelize/models/images/imagestorage.model.js";
import {
  ILikedPost,
  IMageStorage,
  IPost,
  ISavedPost,
  IUnLikedPost,
  IUnSavedPost,
  IUpdatePost,
} from "./interface";
import { IPostRepository } from "./IPostRepository.js";
import users from "../../sequelize/models/usermodels/users.model.js";
import saved_posts from "../../sequelize/models/posts/savedposts.model.js";
import liked_posts from "../../sequelize/models/posts/likedpost.model.js";

export class SequelizePostRepo implements IPostRepository {
  // ** Find images by reference id ** //
  async findImageByReferenceKey(
    key: string,
    value: number
  ): Promise<IMageStorage | null> {
    try {
      const image = await image_storages.findOne({
        where: { [key]: value },
        order: [["created_at", "DESC"]],
      });
      return image;
    } catch (error) {
      console.error(
        `Error finding image by reference key: ${key}, value: ${value}`,
        error
      );
      return null;
    }
  }

  async CreatePost(post: IPost): Promise<IPost> {
    const image = await image_storages.findImageByReferenceKey(
      "creator_id",
      post.creator_id
    );
    const newPost = await posts.create({
      caption: post.caption,
      imageUrl: image?.imageUrl,
      location: post.location,
      tags: post.tags,
      likes_count: post.likes_count,
      comment_count: post.comment_count,
      creator_id: post.creator_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newPost.toJSON() as IPost;
  }

  // ** Update Post ** //
  async UpdatePost(post: IUpdatePost): Promise<any> {
    const image = await image_storages.findImageByReferenceKey(
      "creator_id",
      post.creator_id
    );
    if (!image) {
      throw new Error("Image not found");
    }
    const updatedPost = await posts.update(
      {
        imageUrl: image.imageUrl,
        caption: post.caption,
        location: post.location,
        tags: post.tags,
        likes_count: post.likes_count,
        updated_at: new Date(),
      },
      {
        where: { id: post.id },
        returning: true,
      }
    );
    return updatedPost;
  }

  // ** Get Post by Id ** //
  async GetPostById(id: number): Promise<IPost | null> {
    const post = await posts.findOne({ where: { id: id } });
    return post?.toJSON() as IPost;
  }

  // ** Get recent posts by excluding fetched post ids ** //
  async GetRecentPost(limit: number, offset: number): Promise<IPost[]> {
    const post: PostAttributes[] | null = await posts.findAll({
      attributes: [
        "id",
        "caption",
        "imageUrl",
        "location",
        "tags",
        "likes_count",
        "comment_count",
        "creator_id",
        "created_at",
        "updated_at",
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
      include: [
        {
          model: users,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "avatarUrl",
            "profile_picture",
          ],
        },
      ],
    });
    if (!post) {
      return [];
    }
    return post.map((p) => p.toJSON() as IPost);
  }

  // ** Save Post ** //
  async SavePost(post: ISavedPost): Promise<ISavedPost> {
    // ** Check if the post is already saved to prevent duplicate saves by the same user **//
    const existingSave = await saved_posts.findOne({
      where: { user_id: post.user_id, post_id: post.post_id },
    });
    if (existingSave) {
      return existingSave.toJSON() as ISavedPost;
    }
    const newPost = await saved_posts.create({
      user_id: post.user_id,
      post_id: post.post_id,
      saved_date: new Date(),
    });
    return newPost.toJSON() as ISavedPost;
  }

  // ** Unsave Post ** //
  async UnSavePost(post: IUnSavedPost): Promise<null> {
    await saved_posts.destroy({
      where: { user_id: post.user_id, post_id: post.post_id },
    });
    return null;
  }

  // ** Get all saved posts ** //
  async GetAllSavedPosts(post: ISavedPost): Promise<ISavedPost[]> {
    const savedPosts = await saved_posts.findAll({
      where: { user_id: post.user_id },
      include: [
        {
          model: posts,
          attributes: [
            "id",
            "caption",
            "imageUrl",
            "location",
            "tags",
            "likes_count",
            "creator_id",
            "created_at",
            "updated_at",
          ],
          include: [
            {
              model: users,
              attributes: [
                "id",
                "first_name",
                "last_name",
                "avatarUrl",
                "profile_picture",
              ],
            },
          ],
        },
      ],
    });
    if (!savedPosts) {
      return [];
    }
    return savedPosts.map((p) => p.toJSON() as ISavedPost);
  }

  // ** Like Post ** //
  async LikePost(post: ILikedPost): Promise<ILikedPost> {
    const existingLike = await liked_posts.findOne({
      where: { user_id: post.user_id, post_id: post.post_id },
    });
    if (existingLike) {
      return existingLike.toJSON() as ILikedPost;
    }
    const newPost = await liked_posts.create({
      user_id: post.user_id,
      post_id: post.post_id,
      created_at: new Date(),
    });

    const likedPost = await posts.findOne({
      where: { id: post.post_id },
    });
    if (likedPost) {
      await likedPost.increment("likes_count");
    }
    return newPost.toJSON() as ILikedPost;
  }

  // ** Unlike Post ** //
  async UnLikePost(post: IUnLikedPost): Promise<null> {
    await liked_posts.destroy({
      where: { user_id: post.user_id, post_id: post.post_id },
    });
    const unlikedPost = await posts.findOne({
      where: { id: post.post_id },
    });
    if (unlikedPost) {
      await unlikedPost.decrement("likes_count");
    }
    return null;
  }
}

export default SequelizePostRepo;
