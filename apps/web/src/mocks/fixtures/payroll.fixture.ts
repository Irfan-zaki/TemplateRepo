import { SalaryRule, Payrun } from "../../types/api";

export const salaryRulesFixture: SalaryRule[] = [
  {
    id: "sr-001",
    code: "BASIC",
    name: "Basic Salary",
    category: "basic",
    type: "fixed",
    amount: 5000
  },
  {
    id: "sr-002",
    code: "HRA",
    name: "House Rent Allowance",
    category: "allowance",
    type: "percentage",
    amount: 20
  },
  {
    id: "sr-003",
    code: "PF",
    name: "Provident Fund",
    category: "deduction",
    type: "percentage",
    amount: 10
  }
];

export const payrunsFixture: Payrun[] = [
  {
    id: "pr-2026-10",
    period: "October 2026",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    totalEmployees: 5,
    totalGross: 29500,
    totalNet: 26550,
    status: "paid"
  },
  {
    id: "pr-2026-11",
    period: "November 2026",
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    totalEmployees: 5,
    totalGross: 29500,
    totalNet: 26550,
    status: "draft"
  }
];

