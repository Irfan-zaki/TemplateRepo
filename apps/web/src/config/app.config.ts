export interface AppRoleOption {
  value: string;
  label: string;
}

export interface AppNavOption {
  id: string;
  label: string;
}

export interface AppConfig {
  name: string;
  tagline: string;
  logoText: string;
  version: string;
  securityLabel: string;
  defaultRoles: AppRoleOption[];
  navigation: AppNavOption[];
}

export const APP_CONFIG: AppConfig = {
  name: "HackCore",
  tagline: "Enterprise Modern Template",
  logoText: "H",
  version: "v1.0.0",
  securityLabel: "ISO-27001 AUDITED",
  defaultRoles: [
    { value: "admin", label: "System Administrator" },
    { value: "manager", label: "Team Manager" },
    { value: "member", label: "Team Member" }
  ],
  navigation: [
    { id: "records", label: "Records Console" }
  ]
};

