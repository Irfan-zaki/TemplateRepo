export interface AppRoleOption {
  value: string;
  label: string;
}

export interface AppConfig {
  name: string;
  tagline: string;
  logoText: string;
  version: string;
  defaultRoles: AppRoleOption[];
}

export const APP_CONFIG: AppConfig = {
  name: "HackCore",
  tagline: "Enterprise Modern Template",
  logoText: "H",
  version: "v1.0.0",
  defaultRoles: [
    { value: "admin", label: "System Administrator" },
    { value: "manager", label: "Team Manager" },
    { value: "member", label: "Team Member" }
  ]
};

