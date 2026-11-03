import { employeeHandlers } from "./employees.handlers";
import { attendanceHandlers } from "./attendance.handlers";
import { timeOffHandlers } from "./time-off.handlers";
import { payrollHandlers } from "./payroll.handlers";
import { authHandlers } from "./auth.handlers";

export const handlers = [
  ...employeeHandlers,
  ...attendanceHandlers,
  ...timeOffHandlers,
  ...payrollHandlers,
  ...authHandlers
];

