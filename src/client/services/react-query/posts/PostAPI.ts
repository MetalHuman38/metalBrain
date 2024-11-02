import { AxiosConfig } from "../../../axios/AxiosConfig";
import { IPost, IUpdatePost } from "./interface";
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
}

export default PostAPI;
