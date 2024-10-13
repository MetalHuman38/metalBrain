import { PostForm } from "./form";

const CreatPost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="logo"
            className="w-10 h-10"
          />
          <h1 className="h3-bold md:h-2-bold text-left w-full">Create Post</h1>
        </div>
        <PostForm action="create" />
      </div>
    </div>
  );
};

export default CreatPost;
