import { Link } from "react-router-dom";
import { UserCardProps } from "../../../_root/pages/interface";
import { Button } from "@/components/ui/button";

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user?.id}`} className="user-card">
      <img
        src={
          user?.profile_picture
            ? `${user?.profile_picture}`
            : user?.avatarUrl
              ? `${user?.avatarUrl}`
              : "/assets/icons/profile-placeholder.svg"
        }
        alt={user?.username}
        className="h-16 w-16 rounded-full"
        loading="lazy"
      />
      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user?.first_name} {user?.last_name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user?.username}
        </p>
      </div>
      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
