import { CreateUserForm } from "./form";
import { useCreateAdmin } from "@/client/components/hooks/use-createadmin";
import { CreateAdmin } from "@/client/services/react-query/admin/interface";

export const CreateUser = () => {
  const { createAdmin } = useCreateAdmin();
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <h1>Create User</h1>
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <CreateUserForm
            action={"create"}
            create={(admin: CreateAdmin) => {
              return createAdmin(admin);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
