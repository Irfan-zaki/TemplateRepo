export interface SeedSalaryRule {
  id: string;
  code: string;
  name: string;
  category: "basic" | "allowance" | "deduction";
  type: "fixed" | "percentage";
  amount: number;
}

export interface SeedPayrun {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  totalEmployees: number;
  totalGross: number;
  totalNet: number;
  status: "draft" | "approved" | "paid";
}

export const salaryRulesSeedData: SeedSalaryRule[] = [
  {
    id: "sr-seed-001",
    code: "BASIC",
    name: "Basic Salary",
    category: "basic",
    type: "fixed",
    amount: 5000
  },
  {
    id: "sr-seed-002",
    code: "HRA",
    name: "House Rent Allowance",
    category: "allowance",
    type: "percentage",
    amount: 20
  },
  {
    id: "sr-seed-003",
    code: "PF",
    name: "Provident Fund",
    category: "deduction",
    type: "percentage",
    amount: 10
  },
  {
    id: "sr-seed-004",
    code: "MED",
    name: "Medical Allowance",
    category: "allowance",
    type: "fixed",
    amount: 300
  }
];

export const payrunsSeedData: SeedPayrun[] = [
  {
    id: "pr-seed-2026-10",
    period: "October 2026",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    totalEmployees: 5,
    totalGross: 36000,
    totalNet: 32400,
    status: "paid"
  }
];

