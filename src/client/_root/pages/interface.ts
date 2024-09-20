import { IUser } from "@/client/services/entities/user";

// ** StatBlock Component
export interface StatBlockProps {
  value: string | number;
  label: string;
  color?: string; // Optional color for the value text
}

// ** User card Props Interface for UserCard Component ** //
export type UserCardProps = {
  users: IUser | null;
  showUser?: boolean;
};
