export interface CreateAdmin {
  id?: number;
  new_admin: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  creator_role?: string;
}

export interface IAdmin {
  id: number;
  role: string;
}

export class Admin implements IAdmin {
  constructor(
    public id: number,
    public role: string
  ) {}

  isSuperAdmin(): boolean {
    return this.role === "superadmin";
  }

  isAdmin(): boolean {
    return this.role === "admin" || this.role === "superadmin"; // Include superadmin as a higher-level admin
  }

  isUser(): boolean {
    return this.role === "user";
  }

  isRestrictedUser(): boolean {
    return this.role === "restrictedUser";
  }

  // ** Role base activity permissions ** //
  canperformActivity(activity: string): boolean {
    const userPermissions = [
      "viewProfile",
      "editOwnProfile",
      "editOwnPosts",
      "editOwnComments",
    ];
    const adminPermissions = [
      "viewProfile",
      "editOwnProfile",
      "editOwnPosts",
      "editOwnComments",
      "editUserPosts",
      "editUserComments",
    ];
    const superAdminPermissions = [
      "viewProfile",
      "editOwnProfile",
      "editOwnPosts",
      "editOwnComments",
      "editUserPosts",
      "editUserComments",
      "editAdminPosts",
      "editAdminComments",
    ];
    if (this.isSuperAdmin()) {
      return superAdminPermissions.includes(activity);
    }
    if (this.isAdmin()) {
      return adminPermissions.includes(activity);
    }
    if (this.isUser()) {
      return userPermissions.includes(activity);
    }
    return false;
  }
}
