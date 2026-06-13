import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const company = String(body.company || "").trim();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const product = String(body.product || "").trim();
  const message = String(body.message || "").trim();
  const trap = String(body.website || "").trim();
  const elapsed = Number(body.elapsed || 0);

  // Bot checks: trap field filled, or submitted faster than a human can type.
  if (trap.length > 0 || elapsed < 4000) {
    // Silent accept so bots learn nothing.
    return NextResponse.json({ ok: true });
  }

  if (!company || !name || !email || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    const supabase = createClient(url, serviceKey);
    const { error } = await supabase.from("enquiries").insert({
      company,
      name,
      email,
      product,
      message,
      handled: false,
    });
    if (error) {
      console.error("enquiry insert failed:", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } else {
    // Supabase not configured yet: log so nothing is silently lost in dev.
    console.log("Enquiry received (Supabase not configured):", {
      company,
      name,
      email,
      product,
    });
  }

  return NextResponse.json({ ok: true });
}
