import { UserCard } from "@/client/components/shared/card";
import { Link } from "react-router-dom";
import { UserGridListProps } from "./interface";

export const GridUserList = ({ user, showUser }: UserGridListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {user.map((user) => (
        <Link to={`/profile/${user.id}`} key={user.id}>
          <UserCard user={user} showUser={showUser} />
        </Link>
      ))}
    </div>
  );
};

export default GridUserList;
