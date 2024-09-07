// ** jwt payload types ** //
export type IUserPayload = {
  id: number;
  role: string;
  signOptins?: Partial<string>;
};
