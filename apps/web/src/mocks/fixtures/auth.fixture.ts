import { SignupResponse } from "../../features/auth/types";

export const sampleCreatedUserFixture: SignupResponse = {
  userId: "usr-new-001",
  fullName: "Sarah Connor",
  email: "sarah@cyberdyne.com",
  companyName: "Cyberdyne Systems",
  role: "manager",
  createdAt: "2026-11-04T01:40:00.000Z",
  token: "jwt_starter_sample"
};
