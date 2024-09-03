import bcrypt from "bcrypt";
import { IPasswordHasher } from "./passwordHasher.js";

// ** Implementation of the IPasswordHasher interface using bcrypt ** //
export class BcryptPasswordHandler implements IPasswordHasher {
  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error("Error hashing password", error);
      throw new Error("Error hashing password");
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing password", error);
      throw new Error("Error comparing password");
    }
  }
}

export default { BcryptPasswordHandler };
