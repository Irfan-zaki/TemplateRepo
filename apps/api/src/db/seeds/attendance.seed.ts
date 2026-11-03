export interface SeedAttendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: "present" | "late" | "absent" | "half_day";
  notes?: string;
}

export const attendanceSeedData: SeedAttendance[] = [
  {
    id: "att-rec-001",
    employeeId: "emp-001",
    date: "2026-11-02",
    checkIn: "08:55 AM",
    checkOut: "05:05 PM",
    status: "present"
  },
  {
    id: "att-rec-002",
    employeeId: "emp-002",
    date: "2026-11-02",
    checkIn: "09:42 AM",
    checkOut: "05:30 PM",
    status: "late",
    notes: "Traffic congestion on Highway 101"
  },
  {
    id: "att-rec-003",
    employeeId: "emp-003",
    date: "2026-11-02",
    checkIn: "09:00 AM",
    checkOut: "01:15 PM",
    status: "half_day",
    notes: "Dental emergency appointment"
  },
  {
    id: "att-rec-004",
    employeeId: "emp-004",
    date: "2026-11-02",
    checkIn: "08:48 AM",
    checkOut: "05:10 PM",
    status: "present"
  },
  {
    id: "att-rec-005",
    employeeId: "emp-005",
    date: "2026-11-02",
    checkIn: "08:50 AM",
    checkOut: "06:15 PM",
    status: "present"
  }
];

