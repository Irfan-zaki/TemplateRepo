import { http, HttpResponse } from "msw";
import { employeesFixture } from "../fixtures/employees.fixture";

export const employeeHandlers = [
  http.get("/api/employees", () => {
    return HttpResponse.json({
      success: true,
      data: employeesFixture
    });
  })
];

