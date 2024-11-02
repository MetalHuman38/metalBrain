import { useUserContext } from "@/client/services/context/user/UseContext";
import { useGetRecentPostHandler } from "@/client/components/hooks/use-getrecentpost";
import { Loader } from "@/client/components/shared";
import PostCard from "@/client/components/shared/card/PostCard";
import { useEffect } from "react";
import { IUpdatePost } from "@/client/services/entities/posts";

const Home = () => {
  const { user } = useUserContext();
  const { limit, offset, recentPost, isLoading, isError, handleGetRecentPost } =
    useGetRecentPostHandler();

  // Call handleGetRecentPost when the component mounts
  useEffect(() => {
    handleGetRecentPost(limit, offset);
  }, [handleGetRecentPost]);

  // ** Convert the post to an array of posts ** //
  const post: IUpdatePost[] = Array.isArray(recentPost) ? recentPost : [];
  console.log("Post details in Home component", post);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <p className="text-center">You are logged in as {user?.role}</p>
        <div className="home-posts">
          <div className="flex justify-between items-center gap-96 mb-4">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
              <p className="small-medium md:base-medium text-light-2">All</p>
              <img
                src="/assets/icons/filter.svg"
                alt="filter"
                width={20}
                height={20}
              />
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>Error loading posts</div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {post.map((post: IUpdatePost, index: number) => (
                <PostCard key={post.creator_id || index} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
