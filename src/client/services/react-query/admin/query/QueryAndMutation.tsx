import { useMutation } from "@tanstack/react-query";
import { AdminRepository } from "../AdminRepository";
import { CreateAdminUseCase } from "../AdminUseCase";
import { CreateAdmin } from "../interface";

// ** Create admin Mutation ** //
export const useCreateAdminMutation = () => {
  const adminRepo = new AdminRepository();
  const createAdminUseCase = new CreateAdminUseCase(adminRepo);
  return useMutation({
    mutationFn: (admin: CreateAdmin) => {
      return createAdminUseCase.execute(admin);
    },
  });
};

export default { useCreateAdminMutation };
