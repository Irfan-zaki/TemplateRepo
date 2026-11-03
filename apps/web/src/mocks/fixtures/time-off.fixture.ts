import { TimeOffRequest } from "../../types/api";

export const timeOffFixture: TimeOffRequest[] = [
  {
    id: "to-001",
    employeeId: "emp-002",
    employeeName: "Tashfeen Ahmed",
    leaveType: "paid",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    days: 3,
    status: "approved",
    reason: "Annual family visit"
  },
  {
    id: "to-002",
    employeeId: "emp-003",
    employeeName: "Irfan Sheikh",
    leaveType: "sick",
    startDate: "2026-11-05",
    endDate: "2026-11-06",
    days: 2,
    status: "pending",
    reason: "Medical appointment & recovery"
  },
  {
    id: "to-003",
    employeeId: "emp-004",
    employeeName: "Arsh Patel",
    leaveType: "unpaid",
    startDate: "2026-11-20",
    endDate: "2026-11-21",
    days: 2,
    status: "pending",
    reason: "Personal commitment"
  }
];

