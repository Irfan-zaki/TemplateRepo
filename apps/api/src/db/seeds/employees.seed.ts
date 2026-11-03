export interface SeedEmployee {
  id: string;
  userId?: string;
  departmentId: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "on_leave";
  joinDate: string;
}

export const employeesSeedData: SeedEmployee[] = [
  {
    id: "emp-001",
    userId: "usr-hr-mgr",
    departmentId: "dept-hr",
    name: "Mawiya Khan",
    email: "mawiya@peoplepay360.com",
    role: "HR Manager",
    status: "active",
    joinDate: "2023-01-15"
  },
  {
    id: "emp-002",
    userId: "usr-pay-mgr",
    departmentId: "dept-fin",
    name: "Tashfeen Ahmed",
    email: "tashfeen@peoplepay360.com",
    role: "HR Payroll Manager",
    status: "active",
    joinDate: "2023-03-01"
  },
  {
    id: "emp-003",
    userId: "usr-pay-user",
    departmentId: "dept-fin",
    name: "Irfan Sheikh",
    email: "irfan@peoplepay360.com",
    role: "HR Payroll User",
    status: "active",
    joinDate: "2023-04-10"
  },
  {
    id: "emp-004",
    departmentId: "dept-eng",
    name: "Arsh Patel",
    email: "arsh@peoplepay360.com",
    role: "QA Lead",
    status: "active",
    joinDate: "2023-02-20"
  },
  {
    id: "emp-005",
    userId: "usr-admin",
    departmentId: "dept-eng",
    name: "Zaki Siddiqui",
    email: "zaki@peoplepay360.com",
    role: "Principal Architect",
    status: "active",
    joinDate: "2022-11-01"
  },
  {
    id: "emp-006",
    departmentId: "dept-eng",
    name: "Sara Ali",
    email: "sara@peoplepay360.com",
    role: "Frontend Engineer",
    status: "active",
    joinDate: "2023-06-15"
  },
  {
    id: "emp-007",
    departmentId: "dept-hr",
    name: "David Chen",
    email: "david@peoplepay360.com",
    role: "Talent Acquisition Specialist",
    status: "active",
    joinDate: "2023-08-01"
  }
];

