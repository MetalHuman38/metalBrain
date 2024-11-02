import { useParams } from "react-router-dom";
import { PostForm } from "./form";
import { useGetPostById } from "@/client/services/react-query/posts/PostQueryAndMutation";

// ** Update Post Component ** //
const UpdatePost = () => {
  const { id } = useParams();
  const { data: post } = useGetPostById(Number(id));
  console.log("Update Post component", post);
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="Edit-Post"
            loading="lazy"
          />
          <h2 className="h3-bold md:h-2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="update" post={post} />
      </div>
    </div>
  );
};

export default UpdatePost;
