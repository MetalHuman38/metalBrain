import posts from "../../sequelize/models/posts/posts.model.js";
import PostAttributes from "../../sequelize/models/posts/posts.model.js";
import image_storages from "../../sequelize/models/images/imagestorage.model.js";
import { IMageStorage, IPost, IUpdatePost } from "./interface";
import { IPostRepository } from "./IPostRepository.js";
import users from "../../sequelize/models/usermodels/users.model.js";

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
      creator_id: post.creator_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newPost.toJSON() as PostAttributes;
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
    return post?.toJSON() as PostAttributes;
  }

  // ** Get recent posts by excluding fetched post ids ** //
  async GetRecentPost(
    limit: number,
    offset: number
  ): Promise<PostAttributes[]> {
    const post: PostAttributes[] | null = await posts.findAll({
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
    return post.map((p) => p.toJSON() as PostAttributes);
  }
}

export default SequelizePostRepo;
