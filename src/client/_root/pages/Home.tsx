import { useUserContext } from "@/client/services/context/user/UseContext";

const Home = () => {
  const { user } = useUserContext();
  return (
    <div className="">
      <p className="text-center">You are logged in as {user?.role}</p>
    </div>
  );
};

export default Home;
