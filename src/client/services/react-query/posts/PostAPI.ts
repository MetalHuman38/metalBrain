import { AxiosConfig } from "../../../axios/AxiosConfig";
import { IPost } from "./interface";

export class CreatePostAPI {
  async createPost(post: IPost): Promise<IPost> {
    try {
      const response = await AxiosConfig.post("/create-post", post, {
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
}

export default {
  CreatePostAPI,
};
