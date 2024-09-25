// ** jwt payload types ** //
export type IUserPayload = {
  id: number;
  role: string;
  signOptins?: Partial<string>;
};

// ** jwt email verification payload types ** //
export type IEmailVerificationPayload = {
  email: string;
  token: string;
  signOptins?: Partial<string>;
  type: string;
};
