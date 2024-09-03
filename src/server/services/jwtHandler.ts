import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IUserPayload } from "../loader/types";

export interface IJwtHandler {
  jwtGenerator(payload: IUserPayload): string;
  jwtGenerator(payload: IUserPayload, options: Partial<SignOptions>): string;
  jwtVerifier(token: string): IUserPayload;
  jwtVerifier(token: string, options: Partial<VerifyOptions>): IUserPayload;
  jwtRefreshGenerator(payload: IUserPayload): string;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options: Partial<SignOptions>,
  ): string;
}

export default IJwtHandler;
