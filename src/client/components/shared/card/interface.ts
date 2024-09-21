import { IUser } from "@/client/services/entities/user";

export type UserGridListProps = {
  users: IUser[];
  showUser?: boolean;
};
