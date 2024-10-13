import { CreateUserForm } from "./form";
import { useCreateAdmin } from "@/client/components/hooks/use-createadmin";
import { CreateAdmin } from "@/client/services/react-query/admin/interface";

export const CreateUser = () => {
  const { createAdmin } = useCreateAdmin();
  return (
    <div className="common-container">
      <div className="w-full">
        <CreateUserForm
          action={"create"}
          create={(admin: CreateAdmin) => {
            return createAdmin(admin);
          }}
        />
      </div>
    </div>
  );
};

export default CreateUser;
