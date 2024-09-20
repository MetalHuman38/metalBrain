import { UserCard } from "@/client/components/shared/card";
import { Link } from "react-router-dom";
import { UserGridListProps } from "./interface";

const GridUserList = ({ users, showUser }: UserGridListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {users.map((user) => (
        <Link to={`/profile/${user.id}`} key={user.id}>
          <UserCard users={user} showUser={showUser} />
        </Link>
      ))}
    </div>
  );
};

export default GridUserList;
