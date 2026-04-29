import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth / Email Confirmation callback handler.
 * Supabase redirects here after:
 *   - Email confirmation (signup)
 *   - OAuth sign-in (Google, GitHub, etc.)
 *   - Password reset
 *
 * Exchanges the auth code for a session, then redirects to the dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If code exchange failed, redirect to auth with an error
  return NextResponse.redirect(`${origin}/auth?error=Could not authenticate user`);
}
