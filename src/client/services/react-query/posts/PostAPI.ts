import { AxiosConfig } from "../../../axios/AxiosConfig";
import {
  ILikedPost,
  IPost,
  ISavedPost,
  IUnLikedPost,
  IUnSavedPost,
  IUpdatePost,
} from "./interface";
import { IPostRepository } from "./IPostRepository";

export class PostAPI implements IPostRepository {
  async createPost(post: IPost, token: string): Promise<any> {
    try {
      const response = await AxiosConfig.post("/create-post", {
        post,
        token,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to create post");
    }
  }

  async updatePost(post: IUpdatePost): Promise<any> {
    try {
      const response = await AxiosConfig.put("/update-post", post, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data.updatedPost;
    } catch (error) {
      throw new Error("Unable to update post");
    }
  }

  async getPostById(id: number): Promise<any> {
    try {
      const response = await AxiosConfig.get("/get-post", {
        params: {
          id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data.post;
    } catch (error) {
      throw new Error("Unable to get post");
    }
  }

  async getRecentPost(limit: number, offset: number): Promise<IPost[]> {
    try {
      const response = await AxiosConfig.get("/get-recent-post", {
        params: {
          limit,
          offset,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("response from post api", response.data.post);
      return response.data.post;
    } catch (error) {
      throw new Error("Unable to get recent post");
    }
  }

  async SavePost(post: ISavedPost): Promise<ISavedPost> {
    try {
      const response = await AxiosConfig.post("/save-post", post, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to save post");
    }
  }

  async UnSavePost(post: IUnSavedPost): Promise<null> {
    try {
      const response = await AxiosConfig.delete("/unsave-post", {
        data: post,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to unsave post");
    }
  }

  async GetAllSavedPosts(post: ISavedPost[]): Promise<ISavedPost[]> {
    try {
      const response = await AxiosConfig.get("/get-saved-post", {
        params: {
          post,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to get saved post");
    }
  }

  async LikePost(post: ILikedPost): Promise<ILikedPost> {
    try {
      const response = await AxiosConfig.post("/like-post", post, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to like post");
    }
  }

  async UnLikePost(post: IUnLikedPost): Promise<null> {
    try {
      const response = await AxiosConfig.delete("/unlike-post", {
        data: post,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to unlike post");
    }
  }
}

export default PostAPI;
