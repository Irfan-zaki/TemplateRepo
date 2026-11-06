export interface SeedUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "member";
}

export interface SeedRecord {
  id: string;
  title: string;
  category: string;
  status: "active" | "pending" | "archived";
  value: number;
  updatedAt: string;
}

export const starterUsersSeedData: SeedUser[] = [
  {
    id: "usr-admin-01",
    email: "admin@starter.dev",
    name: "System Administrator",
    role: "admin"
  },
  {
    id: "usr-manager-01",
    email: "manager@starter.dev",
    name: "Operations Lead",
    role: "manager"
  }
];

export const starterRecordsSeedData: SeedRecord[] = [
  {
    id: "REC-1001",
    title: "Global Enterprise Architecture Deployment",
    category: "Infrastructure",
    status: "active",
    value: 45000,
    updatedAt: "2026-11-04 02:30"
  },
  {
    id: "REC-1002",
    title: "High-Throughput Fastify Core Runtime",
    category: "Backend Engine",
    status: "active",
    value: 28000,
    updatedAt: "2026-11-04 02:15"
  },
  {
    id: "REC-1003",
    title: "PostgreSQL Database Migration & Seed Pipeline",
    category: "Database",
    status: "pending",
    value: 17500,
    updatedAt: "2026-11-04 01:45"
  },
  {
    id: "REC-1004",
    title: "Legacy Monolith Microservice Extraction",
    category: "Refactoring",
    status: "archived",
    value: 12000,
    updatedAt: "2026-11-03 23:10"
  },
  {
    id: "REC-1005",
    title: "MSW Network Interception & Test Harness",
    category: "Quality Assurance",
    status: "active",
    value: 21500,
    updatedAt: "2026-11-03 22:00"
  }
];

