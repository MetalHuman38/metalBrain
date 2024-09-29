import { CreateAdmin } from "@/client/services/react-query/admin/interface";

export interface stats {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export type CreateUserFormProps = {
  create: (admin: CreateAdmin) => void;
  action: "create" | "update";
};
