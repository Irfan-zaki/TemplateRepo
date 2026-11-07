import { http, HttpResponse } from "msw";
import { RecordInput, RecordItem } from "../../features/records/types";
import { recordsFixture } from "../fixtures/records.fixture";
import { userFromRequest } from "../session-store";

const records: RecordItem[] = recordsFixture.map((record) => ({ ...record }));

function unauthorized() {
  return HttpResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
}

function forbidden() {
  return HttpResponse.json({ success: false, message: "You do not have access to this action." }, { status: 403 });
}

export const recordsHandlers = [
  http.get("/api/records", ({ request }) => {
    if (!userFromRequest(request)) return unauthorized();
    return HttpResponse.json({ success: true, data: records });
  }),

  http.get("/api/records/:id", ({ request, params }) => {
    if (!userFromRequest(request)) return unauthorized();
    const record = records.find((item) => item.id === params.id);
    if (!record) {
      return HttpResponse.json({ success: false, message: "Record not found." }, { status: 404 });
    }
    return HttpResponse.json({ success: true, data: record });
  }),

  http.post("/api/records", async ({ request }) => {
    const user = userFromRequest(request);
    if (!user) return unauthorized();
    if (user.role === "member") return forbidden();

    const body = (await request.json()) as RecordInput;
    const record: RecordItem = {
      id: `REC-${Date.now().toString(36).toUpperCase()}`,
      title: body.title,
      category: body.category,
      status: body.status,
      value: body.value,
      updatedAt: new Date().toISOString()
    };
    records.unshift(record);
    return HttpResponse.json({ success: true, data: record, message: "Record created." }, { status: 201 });
  }),

  http.patch("/api/records/:id", async ({ request, params }) => {
    const user = userFromRequest(request);
    if (!user) return unauthorized();
    if (user.role === "member") return forbidden();

    const index = records.findIndex((item) => item.id === params.id);
    if (index < 0) {
      return HttpResponse.json({ success: false, message: "Record not found." }, { status: 404 });
    }

    const body = (await request.json()) as Partial<RecordInput>;
    const current = records[index];
    const next: RecordItem = {
      ...current,
      ...body,
      id: current.id,
      updatedAt: new Date().toISOString()
    };
    records[index] = next;
    return HttpResponse.json({ success: true, data: next, message: "Record updated." });
  })
];
