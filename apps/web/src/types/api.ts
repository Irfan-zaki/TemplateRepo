export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "on_leave";
  joinDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: "present" | "late" | "absent" | "half_day";
}

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: "paid" | "sick" | "unpaid" | "maternity";
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

export interface SalaryRule {
  id: string;
  code: string;
  name: string;
  category: "basic" | "allowance" | "deduction";
  type: "fixed" | "percentage";
  amount: number;
}

export interface Payrun {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  totalEmployees: number;
  totalGross: number;
  totalNet: number;
  status: "draft" | "approved" | "paid";
}

