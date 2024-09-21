import { Link } from "react-router-dom";
import { UserCardProps } from "../../../_root/pages/interface";
import { Button } from "@/components/ui/button";

const UserCard = ({ users }: UserCardProps) => {
  return (
    <Link to={`/profile/${users?.id}`} className="user-card">
      <img
        src={
          users?.profile_picture
            ? `${users?.profile_picture}`
            : users?.avatarUrl
              ? `${users?.avatarUrl}`
              : "/assets/icons/profile-placeholder.svg"
        }
        alt={users?.username}
        className="h-16 w-16 rounded-full"
        loading="lazy"
      />
      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {users?.first_name} {users?.last_name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{users?.username}
        </p>
      </div>
      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
