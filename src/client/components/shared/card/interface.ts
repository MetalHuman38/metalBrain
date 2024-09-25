import { IUser } from "@/client/services/entities/user";

export type UserGridListProps = {
  user: IUser[];
  showUser?: boolean;
};

export interface StatCardProps {
  stats: Array<{
    title: string;
    value: string;
    icon: string;
    color: string;
  }>;
}

export interface StatItemsProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}
