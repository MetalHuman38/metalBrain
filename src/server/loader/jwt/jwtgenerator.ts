import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import jwtENV from "../config/jwtENV";
import { IUserPayload } from "../types";

dotenv.config();

// ** jwt generator function ** //
export const jwtGenerator = (payload: IUserPayload): string => {
  try {
    return jwt.sign(payload, jwtENV.JWT_USER_SECRET as string, {
      expiresIn: jwtENV.JWT_USER_EXPIRES_IN,
      algorithm: jwtENV.JWT_USER_ALGORITHM as jwt.Algorithm,
      issuer: jwtENV.JWT_USER_ISSUER,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

// ** jwt verifier function ** //
export const jwtVerifier = (token: string): IUserPayload => {
  try {
    return jwt.verify(token, jwtENV.JWT_USER_SECRET as string, {
      algorithms: [jwtENV.JWT_USER_ALGORITHM as jwt.Algorithm],
      issuer: jwtENV.JWT_USER_ISSUER,
    }) as IUserPayload;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ** jwt refresh generator function ** //
export const jwtRefreshGenerator = (payload: IUserPayload): string => {
  try {
    return jwt.sign(payload, jwtENV.JWT_USER_REFRESH_SECRET as string, {
      expiresIn: jwtENV.JWT_USER_REFRESH_EXPIRES_IN,
      algorithm: jwtENV.JWT_USER_REFRESH_ALGORITHM as jwt.Algorithm,
      issuer: jwtENV.JWT_USER_REFRESH_ISSUER,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
