import { IAdminRepository } from "./IAdminRepository";
import { CreateAdmin } from "./interface";
import { AxiosConfig } from "../../../axios/AxiosConfig";
import axios from "axios";

export class AdminRepository implements IAdminRepository {
  // ** This method is used to create a new admin ** //
  async createAdmin(admin: CreateAdmin): Promise<CreateAdmin> {
    try {
      const response = await AxiosConfig.post("/create", admin);
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        throw new Error("Admin already exists");
      }
      throw new Error("Unable to create admin");
    }
  }
}
