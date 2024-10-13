import posts from "../../sequelize/models/posts/posts.model.js";
import PostAttributes from "../../sequelize/models/posts/posts.model.js";
import image_storages from "../../sequelize/models/images/imagestorage.model.js";
import { IMageStorage, IPost } from "./interface";
import { IPostRepository } from "./IPostRepository.js";

export class SequelizePostRepo implements IPostRepository {
  async CreatePost(post: IPost): Promise<IPost> {
    const newPost = await posts.create({
      caption: post.caption,
      imageUrl: post.imageUrl,
      location: post.location,
      tags: post.tags,
      likes_count: post.likes_count,
      creator_id: post.creator_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newPost.toJSON() as PostAttributes;
  }

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
}

export default SequelizePostRepo;
