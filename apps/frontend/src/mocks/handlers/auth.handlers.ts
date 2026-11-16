import { http, HttpResponse } from "msw";
import { SignupInput } from "../../features/auth/types";
import { issueToken, publicUser, usersByEmail, userFromRequest } from "../session-store";

export const authHandlers = [
  http.post("/api/auth/signup", async ({ request }) => {
    const body = (await request.json()) as SignupInput;
    const email = body.email.toLowerCase();

    if (usersByEmail.has(email)) {
      return HttpResponse.json(
        {
          success: false,
          message: `The work email '${email}' is already registered.`
        },
        { status: 409 }
      );
    }

    const user = {
      userId: `usr-${Date.now().toString(36)}`,
      fullName: body.fullName,
      email,
      companyName: body.companyName,
      role: body.role,
      createdAt: new Date().toISOString(),
      password: body.password
    };
    usersByEmail.set(email, user);

    return HttpResponse.json(
      {
        success: true,
        data: { ...publicUser(user), token: issueToken(email) },
        message: "Account provisioned successfully."
      },
      { status: 201 }
    );
  }),

  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = (body.email ?? "").toLowerCase();
    const user = usersByEmail.get(email);

    if (!user || user.password !== body.password) {
      return HttpResponse.json({ success: false, message: "Email or password is incorrect." }, { status: 401 });
    }

    return HttpResponse.json({
      success: true,
      data: { ...publicUser(user), token: issueToken(email) },
      message: "Signed in."
    });
  }),

  http.get("/api/auth/me", ({ request }) => {
    const user = userFromRequest(request);
    if (!user) {
      return HttpResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    return HttpResponse.json({ success: true, data: publicUser(user) });
  })
];
