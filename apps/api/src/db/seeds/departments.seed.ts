export interface SeedDepartment {
  id: string;
  name: string;
  code: string;
  managerId: string;
}

export const departmentsSeedData: SeedDepartment[] = [
  {
    id: "dept-hr",
    name: "Human Resources",
    code: "HR",
    managerId: "usr-hr-mgr"
  },
  {
    id: "dept-fin",
    name: "Finance & Payroll",
    code: "FIN",
    managerId: "usr-pay-mgr"
  },
  {
    id: "dept-eng",
    name: "Engineering & IT",
    code: "ENG",
    managerId: "usr-admin"
  }
];

