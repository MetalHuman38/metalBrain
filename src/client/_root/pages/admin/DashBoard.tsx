import { useUserContext } from "@/client/services/context/user/UseContext";

const DashBoard = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <h1 className="h4-bold md:h3-bold text-left w-full">
          Hey {user?.username}, How's your day going?
        </h1>
      </div>
    </div>
  );
};

export default DashBoard;
