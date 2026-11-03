import { http, HttpResponse } from "msw";
import { attendanceFixture } from "../fixtures/attendance.fixture";

export const attendanceHandlers = [
  http.get("/api/attendance", () => {
    return HttpResponse.json({
      success: true,
      data: attendanceFixture
    });
  })
];

