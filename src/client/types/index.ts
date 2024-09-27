export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
  target?: string;
  rel: string;
  allowedRoles: string[];
};

export interface HeaderProps {
  title: string;
}
