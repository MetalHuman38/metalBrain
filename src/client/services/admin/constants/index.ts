export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/admin/dashboard",
    label: "Dashboard",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/admin/create-user",
    label: "Create User",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/notifications.svg",
    route: "/notifications",
    label: "Notifications",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/profile.svg",
    route: "/profile",
    label: "Profile",
    rel: "",
    target: "_self",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    imgURL: "/assets/icons/settings.svg",
    route: "/settings",
    label: "Settings",
    rel: "",
    target: "_self",
    allowedRoles: ["superadmin", "admin"],
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/admin/create-user",
    label: "Create User",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/notifications.svg",
    route: "/admin/notifications",
    label: "Notifications",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/profile.svg",
    route: "/profile",
    label: "Profile",
    rel: "",
    target: "_self",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    imgURL: "/assets/icons/settings.svg",
    route: "/settings",
    label: "Settings",
    rel: "",
    target: "_self",
    allowedRoles: ["superadmin", "admin", "user"],
  },
];

export class RouteAccess {
  static isActive(pathname: string, route: string) {
    return pathname === route;
  }
  static isExternalLink(target: string) {
    return target === "_blank";
  }
  static hasAccess(allowedRoles: string[], userRole: string) {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (!userRole) return false;
    return allowedRoles.includes(userRole);
  }
}
