import { NextRequest, NextResponse } from "next/server";

// Пока просто принимаем обращение; доставку на почту подключим позже
// (Resend / SMTP — решим, куда должны приходить письма).
export async function POST(req: NextRequest) {
  const { email, message } = await req.json().catch(() => ({}));

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length === 0 ||
    message.length > 5000
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.log(`[contact] от ${email}: ${message.slice(0, 200)}`);
  return NextResponse.json({ ok: true });
}
