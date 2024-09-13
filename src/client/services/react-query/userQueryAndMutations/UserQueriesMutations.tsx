// ** This file contains the react-query mutations for the user login and register ** //
// ** UserQueriesMutations.tsx ** //
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserRepository } from "../userApiRepo/UserRepository";
import {
  GetCurrentUserUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  VerifyUserUseCase,
} from "../userApiRepo/UserUseCases";
import { INewUser } from "../../entities/user";
import { UserQueryKeys } from "../userApiRepo/UserQueryKeys";

// ** Register User Mutation ** //
export const useRegisterUserMutation = () => {
  const userRepository = new UserRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  return useMutation({
    mutationFn: (user: INewUser) => {
      return registerUserUseCase.execute(user);
    },
  });
};

// ** Login User Mutation ** //
export const useLoginUserMutation = () => {
  const userRepository = new UserRepository();
  const loginUserUseCase = new LoginUserUseCase(userRepository);
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => {
      return loginUserUseCase.execute(user.email, user.password);
    },
  });
};

// ** logout User Mutation ** //
export const useLogoutUserMutation = () => {
  const userRepository = new UserRepository();
  const logoutUserUseCase = new LogoutUserUseCase(userRepository);
  return useMutation({
    mutationFn: (email: string) => {
      return logoutUserUseCase.execute(email);
    },
  });
};

// ** Verify User Mutation ** //
export const useVerifyUserMutation = () => {
  const userRepository = new UserRepository();
  const verifyUserUseCase = new VerifyUserUseCase(userRepository);
  return useMutation({
    mutationFn: (id: string) => {
      return verifyUserUseCase.execute(id);
    },
  });
};

// ** Refresh Token Mutation ** //
export const useRefreshTokenMutation = () => {
  const userRepository = new UserRepository();
  const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => {
      return refreshTokenUseCase.execute(id, role);
    },
  });
};

// ** Get current user Mutation using queryKey ** //
export const useGetCurrentUserQuery = (id: string) => {
  const userRepository = new UserRepository();
  const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);
  return useQuery({
    queryKey: [UserQueryKeys.GET_CURRENT_USER],
    queryFn: () =>
      getCurrentUserUseCase.execute(id).then((response) => response),
  });
};

export default {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyUserMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
};
