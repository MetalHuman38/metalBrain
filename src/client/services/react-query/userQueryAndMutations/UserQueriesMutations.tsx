// ** This file contains the react-query mutations for the user login and register ** //
// ** UserQueriesMutations.tsx ** //
import { useMutation } from "@tanstack/react-query";
import { UserRepository } from "../userApiRepo/UserRepository";
import {
  LoginUserUseCase,
  RegisterUserUseCase,
  VerifyUserUseCase,
} from "../userApiRepo/UserUseCases";
import { INewUser } from "../userApiRepo";

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

// ** Verify User Mutation ** //
export const useVerifyUserMutation = () => {
  const userRepository = new UserRepository();
  const verifyUserUseCase = new VerifyUserUseCase(userRepository);
  return useMutation({
    mutationFn: (token: string) => {
      return verifyUserUseCase.execute(token);
    },
  });
};

export default { useRegisterUserMutation, useLoginUserMutation };
