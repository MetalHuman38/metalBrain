export interface IAdmin {
  id: number;
  role: string;
}
export class Admin implements IAdmin {
  constructor(
    public id: number,
    public role: string
  ) {}

  isAdmin(): boolean {
    return this.role === "admin" || this.role === "superadmin"; // Include superadmin as a higher-level admin
  }

  isSuperAdmin(): boolean {
    return this.role === "superadmin";
  }
}
