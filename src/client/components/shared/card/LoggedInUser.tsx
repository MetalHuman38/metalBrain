// Desc: LoggedInUser component
import { useUserContext } from "@/client/services/context/user/UseContext";
import { Link } from "react-router-dom";

const LoggedInUser = () => {
  const { user } = useUserContext();
  return (
    <div className="charts">
      <div className="flex items-center justify-center bg-sky-900 bg-opacity-20 backdrop-blur-md shadow-lg border-b border-gray-700">
        <h2 className="text-2xl font-semibold text-center text-gray-400 py-4">
          active user
        </h2>
      </div>
      <div className="flex items-center p-4">
        <Link to={`/profile/${user?.id}`} className="">
          <div className="relative flex flex-row">
            <img
              className="w-12 h-12 rounded-full
          border-2 border-primary"
              src={
                user?.profile_picture
                  ? `${user?.profile_picture}`
                  : user?.avatarUrl
                    ? `${user?.avatarUrl}`
                    : "/assets/icons/profile-placeholder.svg"
              }
              alt={user?.username}
            />
          </div>
        </Link>
        <div className="flex flex-col ml-4">
          <div className="flex-1 mr-5 items-center justify-center">
            <p className="text-lg font-semibold text-gray-400">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
          <p className="flex-1 text-left text-sm font-medium text-gray-500">
            @{user?.username}
          </p>
        </div>
        <div className="relative">
          <span className="isActive"></span>
        </div>
      </div>
    </div>
  );
};

export default LoggedInUser;
