import { CreateUserFormProps } from "@/client/_root/pages/admin/interface";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { useCreateAdmin } from "@/client/components/hooks/use-createadmin";
import { CreateAdminValidation } from "@/client/services/validations/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Loader } from "@/client/components/shared";

const CreateUserForm = ({ create, action }: CreateUserFormProps) => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const { createAdmin, isLoading, error, isSuccess } = useCreateAdmin();
  const navigate = useNavigate();

  // ** Define form validation schema ** //
  const form = useForm<z.infer<typeof CreateAdminValidation>>({
    resolver: zodResolver(CreateAdminValidation),
    defaultValues: {
      new_admin: "",
      username: "",
      email: "",
      password: "",
      role: "admin",
      created_at: new Date(),
      creator_role: user?.role,
    },
  });

  // ** Define submit handler ** //
  async function onSubmit(values: z.infer<typeof CreateAdminValidation>) {
    try {
      const newAdmim = create
        ? create(values)
        : await createAdmin({
            new_admin: values.new_admin,
            username: values.username,
            email: values.email,
            password: values.password,
            role: values.role,
            created_at: values.created_at,
            creator_role: values.creator_role,
          });
      if (newAdmim) {
        toast({
          description: "Admin created successfully",
        });
        if (action === "create") {
          form.reset();
        } else {
          navigate("/admin/dashboard");
        }
      }
    } catch (error: any) {
      toast({
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 shadow-md w-full max-w-lg max-auto"
      >
        <div>
          <h1 className="text-left text-2xl font-bold text-gray-200 shadow-md w-full max-w-lg max-auto mb-6">
            {action === "create" ? "Create Admin" : "Update Admin"}
          </h1>
        </div>
        <FormField
          control={form.control}
          name="new_admin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="new_admin" className="text-light-3">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="new_admin"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username" className="text-light-3">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="username"
                  className="shad-input"
                  {...field}
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="text-light-3">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  className="shad-input"
                  {...field}
                  placeholder="Enter email address"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="text-light-3">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  className="shad-input"
                  {...field}
                  placeholder="Enter password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Field */}
        <FormField
          control={form.control}
          name="creator_role"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="creator_role" className="text-light-3">
                Enter Authorization Role
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="creator_role"
                  className="shad-input"
                  {...field}
                  placeholder="You must be authorized to create an admin"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="shad-button_primary whitespace-nowrap"
        >
          {isLoading ? (
            <div>
              <Loader /> Creating...
            </div>
          ) : (
            "Create Admin"
          )}
        </Button>
        {/* Display Success or Error Messages */}
        {isSuccess && <p>Admin created successfully!</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Form>
  );
};

export default CreateUserForm;
