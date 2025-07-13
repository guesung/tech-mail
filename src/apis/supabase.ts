import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";

export const getBlogs = async (): Promise<Tables<"blogs">[]> => {
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true);
  if (blogError) throw new Error(blogError.message);
  if (!blogs) throw new Error("No blogs found");
  return blogs;
};

export const getSubscribers = async (): Promise<Tables<"subscribers">[]> => {
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .eq("is_active", true);
  if (subError) throw new Error(subError.message);
  if (!subscribers) throw new Error("No subscribers found");
  return subscribers;
};
