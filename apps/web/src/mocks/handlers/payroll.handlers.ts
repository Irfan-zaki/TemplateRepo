import { http, HttpResponse } from "msw";
import { salaryRulesFixture, payrunsFixture } from "../fixtures/payroll.fixture";

export const payrollHandlers = [
  http.get("/api/salary-rules", () => {
    return HttpResponse.json({
      success: true,
      data: salaryRulesFixture
    });
  }),
  http.get("/api/payruns", () => {
    return HttpResponse.json({
      success: true,
      data: payrunsFixture
    });
  })
];

