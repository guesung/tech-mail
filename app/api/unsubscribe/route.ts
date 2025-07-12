import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

interface UnsubscribeBody {
  email: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as UnsubscribeBody;
  if (!body.email) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("subscribers")
    .update({ is_active: false })
    .eq("email", body.email)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
