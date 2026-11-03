export interface SeedLeaveAllocation {
  id: string;
  employeeId: string;
  leaveType: "paid" | "sick" | "unpaid" | "maternity";
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  year: number;
}

export interface SeedTimeOffRequest {
  id: string;
  employeeId: string;
  leaveType: "paid" | "sick" | "unpaid" | "maternity";
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
  approverId?: string;
}

export const leaveAllocationsSeedData: SeedLeaveAllocation[] = [
  {
    id: "alloc-001",
    employeeId: "emp-001",
    leaveType: "paid",
    totalDays: 20,
    usedDays: 4,
    remainingDays: 16,
    year: 2026
  },
  {
    id: "alloc-002",
    employeeId: "emp-002",
    leaveType: "paid",
    totalDays: 20,
    usedDays: 3,
    remainingDays: 17,
    year: 2026
  },
  {
    id: "alloc-003",
    employeeId: "emp-003",
    leaveType: "sick",
    totalDays: 10,
    usedDays: 2,
    remainingDays: 8,
    year: 2026
  }
];

export const timeOffRequestsSeedData: SeedTimeOffRequest[] = [
  {
    id: "tor-001",
    employeeId: "emp-002",
    leaveType: "paid",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    days: 3,
    status: "approved",
    reason: "Annual family visit",
    approverId: "usr-hr-mgr"
  },
  {
    id: "tor-002",
    employeeId: "emp-003",
    leaveType: "sick",
    startDate: "2026-11-05",
    endDate: "2026-11-06",
    days: 2,
    status: "pending",
    reason: "Medical appointment & recovery"
  },
  {
    id: "tor-003",
    employeeId: "emp-004",
    leaveType: "unpaid",
    startDate: "2026-11-20",
    endDate: "2026-11-21",
    days: 2,
    status: "pending",
    reason: "Personal commitment"
  }
];

