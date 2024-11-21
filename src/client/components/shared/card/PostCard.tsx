import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "./interface";
import { useUserContext } from "@/client/services/context/user/UseContext";
import PostStats from "./PostStats";

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const [isUserLoading] = useState(false);

  console.log("Post details", post);
  console.log("User details", user);

  if (isUserLoading) return null;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post?.creator_id}`}>
            <img
              src={
                post?.user?.profile_picture
                  ? `${post?.user?.profile_picture}`
                  : post?.user?.avatarUrl
                    ? `${post?.user?.avatarUrl}`
                    : "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              loading="lazy"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-meduim lg:body-bold text-light-1">
              {post?.user?.first_name} {post?.user?.last_name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {post?.created_at && timeAgo(post?.created_at.toString())}
              </p>
              -
              <p className="sublte-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post?.id}`}
          className={`${user?.id?.toString() !== post?.creator_id?.toString() && "hidden"} `}
        >
          <img
            src="/assets/icons/edit.svg"
            alt="Options"
            loading="lazy"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/posts/${post?.id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post?.caption}</p>
          <ul className="flex gap-1 mt-2">
            {(post?.tags || "").split(",").map((tag, index) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={`${post?.imageUrl}` || "/assets/icons/image-placeholder.svg"}
          alt="post-image"
          loading="lazy"
          className="post-card_img"
        />
      </Link>
      <PostStats post={post} id={user?.id} />
    </div>
  );
};

export default PostCard;
