import bcrypt from "bcrypt";
import { IPasswordHasher } from "./index.js";
import {
  InternalServerError,
  PasswordLengthError,
  PasswordValidationError,
} from "../loader/utils/app-errors.js";

// ** Implementation of the IPasswordHasher interface using bcrypt ** //
export class BcryptPasswordHandler implements IPasswordHasher {
  // ** Hash Password ** //
  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error("Error hashing password", error);
      throw new Error("Error hashing password");
    }
  }

  // ** Compare Password ** //
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing password", error);
      throw new Error("Error comparing password");
    }
  }

  // ** Validate Password ** //
  validatePassword(password: string): Promise<boolean> {
    if (password.length < 8) {
      throw new PasswordLengthError();
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new PasswordValidationError();
    }
    // Prevent too many identical characters
    if (/([a-zA-Z0-9])\1\1/.test(password)) {
      throw new InternalServerError();
    }
    return Promise.resolve(true);
  }
}

export default { BcryptPasswordHandler };
