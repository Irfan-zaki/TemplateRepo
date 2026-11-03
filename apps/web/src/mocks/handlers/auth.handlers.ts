import { http, HttpResponse } from "msw";
import { SignupInput, SignupResponse } from "../../features/auth/types";

export const authHandlers = [
  http.post("/api/auth/signup", async ({ request }) => {
    const body = (await request.json()) as SignupInput;

    // Simulate backend conflict validation
    if (body.email === "conflict@exists.com" || body.email === "admin@peoplepay360.com") {
      return HttpResponse.json(
        {
          success: false,
          message: `The work email '${body.email}' is already registered.`
        },
        { status: 409 }
      );
    }

    // Simulate valid registration
    const newRecord: SignupResponse = {
      userId: `usr-${Date.now().toString(36)}`,
      fullName: body.fullName,
      email: body.email,
      companyName: body.companyName,
      role: body.role,
      createdAt: new Date().toISOString(),
      token: `jwt_pp360_${Math.random().toString(36).substring(2)}`
    };

    return HttpResponse.json(
      {
        success: true,
        data: newRecord,
        message: "Organization account created successfully."
      },
      { status: 201 }
    );
  })
];

