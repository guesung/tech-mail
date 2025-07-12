import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

interface SubscribeBody {
  email: string;
  rssUrls: string[];
}

export async function POST(req: Request) {
  const body = (await req.json()) as SubscribeBody;
  if (!body.email || !Array.isArray(body.rssUrls)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("subscribers")
    .upsert(
      {
        email: body.email,
        subscribed_blog_ids: body.rssUrls,
        is_active: true,
      },
      { onConflict: "email" }
    )
    .select()
    .single();
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
