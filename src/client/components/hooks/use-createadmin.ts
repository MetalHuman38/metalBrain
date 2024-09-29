import { useCreateAdminMutation } from "@/client/services/react-query/admin/query/QueryAndMutation";
import { CreateAdmin } from "@/client/services/react-query/admin/interface";
// ** Type: Custom hook ** //
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useCreateAdmin = () => {
  const createAdminMutation = useCreateAdminMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const createAdmin = async (admin: CreateAdmin) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const response = await createAdminMutation.mutateAsync(admin);
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        description: "Admin created successfully",
      });
      navigate("/admin/dashboard");
      return response;
    } catch (error: any) {
      setError(error.message || "Unable to create admin");
      setIsLoading(false);
      throw error;
    }
  };

  return { createAdmin, isLoading, error, isSuccess };
};

export default { useCreateAdmin };
