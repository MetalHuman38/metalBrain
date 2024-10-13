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

export type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

export type FileWithPreview = File & {
  preview: string;
};
