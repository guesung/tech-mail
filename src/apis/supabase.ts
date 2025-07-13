import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";

export const getSubscribers = async (): Promise<Tables<"subscribers">[]> => {
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .eq("is_active", true);
  if (subError) throw new Error(subError.message);
  if (!subscribers) throw new Error("No subscribers found");
  return subscribers;
};
