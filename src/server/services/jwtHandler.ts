import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IEmailVerificationPayload, IUserPayload } from "../loader/types";

export interface IJwtHandler {
  jwtGenerator(payload: IUserPayload): string;
  jwtGenerator(payload: IUserPayload, options: Partial<SignOptions>): string;
  jwtVerifier(token: string): IUserPayload;
  jwtVerifier(token: string, options: Partial<VerifyOptions>): IUserPayload;
  jwtRefreshGenerator(payload: IUserPayload): string;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options: Partial<SignOptions>
  ): string;
  jwtEmailVerificationGenerator(payload: IEmailVerificationPayload): string;
  jwtVerifyEmailVerification(token: string): IEmailVerificationPayload;
  jwtVerifyEmailVerification(
    token: string,
    options: Partial<VerifyOptions>
  ): IEmailVerificationPayload;
}

export default IJwtHandler;
