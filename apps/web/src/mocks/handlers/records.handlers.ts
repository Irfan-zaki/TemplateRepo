import { http, HttpResponse } from "msw";
import { recordsFixture } from "../fixtures/records.fixture";

export const recordsHandlers = [
  http.get("/api/records", () => {
    return HttpResponse.json({
      success: true,
      data: recordsFixture
    });
  })
];

