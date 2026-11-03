import { http, HttpResponse } from "msw";
import { timeOffFixture } from "../fixtures/time-off.fixture";

export const timeOffHandlers = [
  http.get("/api/time-off/requests", () => {
    return HttpResponse.json({
      success: true,
      data: timeOffFixture
    });
  })
];

