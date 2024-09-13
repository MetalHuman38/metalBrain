import { useUserContext } from "@/client/services/context/user/UseContext";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "@/client/components/hooks/use-refreshToken";
import { useEffect } from "react";
import { AxiosConfigPrivate } from "@/client/axios/AxiosConfig";

export const AxiosPrivate = () => {
  const { user } = useUserContext();
  const refresh = useRefreshToken();
  const { setAuthenticatedUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = AxiosConfigPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && user) {
          const resfreshToken = JSON.parse(
            sessionStorage.getItem("refreshToken") || "{}"
          );
          config.headers.Authorization = `Bearer ${resfreshToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error(error));
      }
    );
    const responseInterceptor = AxiosConfigPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.message &&
          !originalRequest.sent
        ) {
          originalRequest.sent = true;
          try {
            const refresToken = await refresh();
            originalRequest.headers.Authorization = `Bearer ${refresToken}`;
            return AxiosConfigPrivate(originalRequest);
          } catch (error) {
            if (!user) {
              navigate("/sign-in");
            } else {
              throw new Error("Error refreshing token");
            }
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      AxiosConfigPrivate.interceptors.request.eject(requestInterceptor);
      AxiosConfigPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [setAuthenticatedUser, user, refresh, navigate]);
  return AxiosConfigPrivate;
};

export default AxiosPrivate;
