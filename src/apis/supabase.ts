import { supabase } from "@/lib/supabase";
import { Blog, Subscriber } from "@/types";

export const getBlogs = async (): Promise<Blog[]> => {
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true);
  if (blogError) throw new Error(blogError.message);
  if (!blogs) throw new Error("No blogs found");
  return blogs;
};

export const getSubscribers = async (): Promise<Subscriber[]> => {
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .eq("is_active", true);
  if (subError) throw new Error(subError.message);
  if (!subscribers) throw new Error("No subscribers found");
  return subscribers;
};
