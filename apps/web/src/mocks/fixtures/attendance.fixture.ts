import { AttendanceRecord } from "../../types/api";

export const attendanceFixture: AttendanceRecord[] = [
  {
    id: "att-001",
    employeeId: "emp-001",
    employeeName: "Mawiya Khan",
    date: "2026-11-03",
    checkIn: "08:55 AM",
    checkOut: "05:05 PM",
    status: "present"
  },
  {
    id: "att-002",
    employeeId: "emp-002",
    employeeName: "Tashfeen Ahmed",
    date: "2026-11-03",
    checkIn: "09:35 AM",
    checkOut: "05:30 PM",
    status: "late"
  },
  {
    id: "att-003",
    employeeId: "emp-003",
    employeeName: "Irfan Sheikh",
    date: "2026-11-03",
    checkIn: "09:00 AM",
    checkOut: "01:30 PM",
    status: "half_day"
  },
  {
    id: "att-004",
    employeeId: "emp-004",
    employeeName: "Arsh Patel",
    date: "2026-11-03",
    checkIn: "08:45 AM",
    checkOut: "05:15 PM",
    status: "present"
  },
  {
    id: "att-005",
    employeeId: "emp-005",
    employeeName: "Zaki Siddiqui",
    date: "2026-11-03",
    checkIn: "08:50 AM",
    checkOut: "06:00 PM",
    status: "present"
  }
];

