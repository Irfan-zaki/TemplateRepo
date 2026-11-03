export interface SeedContract {
  id: string;
  employeeId: string;
  wageType: "monthly" | "hourly";
  wageAmount: number;
  structure: string;
  startDate: string;
  endDate?: string;
  status: "active" | "expired";
}

export const contractsSeedData: SeedContract[] = [
  {
    id: "cnt-001",
    employeeId: "emp-001",
    wageType: "monthly",
    wageAmount: 7500,
    structure: "Standard HR Management",
    startDate: "2023-01-15",
    status: "active"
  },
  {
    id: "cnt-002",
    employeeId: "emp-002",
    wageType: "monthly",
    wageAmount: 7200,
    structure: "Executive Payroll Lead",
    startDate: "2023-03-01",
    status: "active"
  },
  {
    id: "cnt-003",
    employeeId: "emp-003",
    wageType: "monthly",
    wageAmount: 5500,
    structure: "Standard Payroll Specialist",
    startDate: "2023-04-10",
    status: "active"
  },
  {
    id: "cnt-004",
    employeeId: "emp-004",
    wageType: "monthly",
    wageAmount: 6800,
    structure: "Senior QA Engineering",
    startDate: "2023-02-20",
    status: "active"
  },
  {
    id: "cnt-005",
    employeeId: "emp-005",
    wageType: "monthly",
    wageAmount: 9000,
    structure: "Staff Architecture & Tech Lead",
    startDate: "2022-11-01",
    status: "active"
  }
];

