import { useEffect } from "react";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { isUserAuthenticated } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isUserAuthenticated, navigate]);
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>
      <img
        src="/assets/images/brain.png"
        alt="auth-bg"
        className="hidden md:block w-3/5 max-h-screen object-cover object-center bg-no-repeat scale-75"
      />
    </>
  );
};

export default AuthLayout;
