import { IPost } from "@/client/services/react-query/posts/interface";

export type PostFormProps = {
  post?: IPost;
  action: "create" | "update";
};
