import { supabase } from "@/app/lib/supabase";
import type { Blog } from "@/app/types/blog";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data as Blog[]);
}
