export interface SeedUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "hr_manager" | "hr_payroll_user" | "hr_payroll_manager";
}

export const usersSeedData: SeedUser[] = [
  {
    id: "usr-admin",
    email: "admin@peoplepay360.com",
    name: "System Administrator",
    role: "admin"
  },
  {
    id: "usr-hr-mgr",
    email: "hr.manager@peoplepay360.com",
    name: "Mawiya Khan",
    role: "hr_manager"
  },
  {
    id: "usr-pay-user",
    email: "payroll.user@peoplepay360.com",
    name: "Irfan Sheikh",
    role: "hr_payroll_user"
  },
  {
    id: "usr-pay-mgr",
    email: "payroll.manager@peoplepay360.com",
    name: "Tashfeen Ahmed",
    role: "hr_payroll_manager"
  }
];

