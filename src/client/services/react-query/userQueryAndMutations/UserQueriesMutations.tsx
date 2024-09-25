// ** This file contains the react-query mutations for the user login and register ** //
// ** UserQueriesMutations.tsx ** //
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserRepository } from "../userApiRepo/UserRepository";
import {
  GetAllUsersCountUseCase,
  GetAllUsersUseCase,
  GetCurrentUserUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  SearchUsersUseCase,
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
    mutationFn: (id: string) => {
      return logoutUserUseCase.execute(id);
    },
  });
};

// ** Verify User Mutation ** //
export const useVerifyUserMutation = (id: string, role: string) => {
  const userRepository = new UserRepository();
  const verifyUserUseCase = new VerifyUserUseCase(userRepository);
  return useQuery({
    queryKey: [UserQueryKeys.VERIFY_USER],
    queryFn: () =>
      verifyUserUseCase.execute(id, role).then((response) => response),
    enabled: !!id && !!role,
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
    queryKey: [UserQueryKeys.GET_CURRENT_USER, id],
    queryFn: () =>
      getCurrentUserUseCase.execute(id).then((response) => response),
    enabled: !!id,
  });
};

// ** Get All Users Mutation using queryKey ** //
export const useGetAllUsersQuery = (limit: number, offset: number) => {
  const userRepository = new UserRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  return useQuery({
    queryKey: [UserQueryKeys.GET_ALL_USERS, limit, offset],
    queryFn: () =>
      getAllUsersUseCase.execute(limit, offset).then((response) => response),
  });
};

// ** Search Users Mutation using queryKey ** //
export const useSearchUsersQuery = (searchValue: string) => {
  const userRepository = new UserRepository();
  const searchUsersUseCase = new SearchUsersUseCase(userRepository);
  return useQuery({
    queryKey: [UserQueryKeys.GET_SEARCH_VALUES, searchValue],
    queryFn: () =>
      searchUsersUseCase.execute(searchValue).then((response) => response),
    enabled: !!searchValue,
  });
};

// ** Get All Users Count Mutation using queryKey ** //
export const useGetAllUsersCountQuery = (limit: number, offset: number) => {
  const userRepository = new UserRepository();
  const getAllUsersCountUseCase = new GetAllUsersCountUseCase(userRepository);
  return useQuery({
    queryKey: [UserQueryKeys.GET_ALL_USER_COUNT, limit, offset],
    queryFn: () =>
      getAllUsersCountUseCase
        .execute(limit, offset)
        .then((response) => response),
    enabled: !!limit && !!offset,
  });
};

export default {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyUserMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
  useSearchUsersQuery,
  useGetAllUsersCountQuery,
};
