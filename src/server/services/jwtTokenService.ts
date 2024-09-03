import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IJwtHandler } from "../services/jwtHandler.js";
import jwtENV from "../loader/config/jwtENV.js";
import { IUserPayload } from "../loader/types";

export class JwtTokenService implements IJwtHandler {
  jwtGenerator(payload: IUserPayload): string;
  jwtGenerator(payload: IUserPayload, options: Partial<SignOptions>): string;
  jwtGenerator(payload: IUserPayload, options?: Partial<SignOptions>): string {
    try {
      const signOptions: SignOptions = {
        expiresIn: jwtENV.JWT_USER_EXPIRES_IN * 60,
        algorithm: jwtENV.JWT_USER_ALGORITHM as jwt.Algorithm,
        issuer: jwtENV.JWT_USER_ISSUER,
        ...options,
      };

      const secret = jwtENV.JWT_USER_SECRET;
      return jwt.sign(payload, secret as string, signOptions);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  jwtVerifier(token: string): IUserPayload;
  jwtVerifier(token: string, options: Partial<VerifyOptions>): IUserPayload;
  jwtVerifier(token: string, options?: Partial<VerifyOptions>): IUserPayload {
    try {
      const verifyOptions: VerifyOptions = {
        algorithms: [jwtENV.JWT_USER_ALGORITHM as jwt.Algorithm],
        issuer: jwtENV.JWT_USER_ISSUER,
        ...options,
      };

      const secret = jwtENV.JWT_USER_SECRET;
      return jwt.verify(token, secret as string, verifyOptions) as IUserPayload;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  jwtRefreshGenerator(payload: IUserPayload): string;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options: Partial<SignOptions>,
  ): string;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options?: Partial<SignOptions>,
  ): string {
    try {
      const signOptions: SignOptions = {
        expiresIn: jwtENV.JWT_USER_REFRESH_EXPIRES_IN * 60,
        algorithm: jwtENV.JWT_USER_ALGORITHM as jwt.Algorithm,
        issuer: jwtENV.JWT_USER_ISSUER,
        ...options,
      };

      const secret = jwtENV.JWT_USER_SECRET;
      return jwt.sign(payload, secret as string, signOptions);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default { JwtTokenService };
