export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
    rel: "",
    target: "_self",
    allowedRoles: ["admin", "user", "superadmin"],
  },
  {
    imgURL: "/assets/icons/profile.svg",
    route: "/admin/dashboard",
    label: "MetalBrain",
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
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
    rel: "",
    target: "_self",
    allowedRoles: [],
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
    rel: "",
    target: "_self",
    allowedRoles: ["admin", "user", "superadmin"],
  },
  {
    imgURL: "/assets/icons/profile.svg",
    route: "/admin/dashboard",
    label: "MetalBrain",
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
