import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { isAdmin } from "../../../lib/auth";

export const prerender = false;

export const GET: APIRoute = async ({ request: _request }) => {
  try {
    // Get session from Supabase client (browser-side)
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log(
      "Check auth - session:",
      session ? "exists" : "null",
      "error:",
      error,
    );

    if (error || !session?.user?.email) {
      return new Response(
        JSON.stringify({
          authenticated: false,
          isAdmin: false,
          debug: { hasSession: !!session, error: error?.message },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const adminStatus = await isAdmin(session.user.email);
    console.log("Admin status for", session.user.email, ":", adminStatus);

    return new Response(
      JSON.stringify({
        authenticated: true,
        isAdmin: adminStatus,
        email: session.user.email,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("Check auth error:", error);
    return new Response(
      JSON.stringify({
        authenticated: false,
        isAdmin: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
