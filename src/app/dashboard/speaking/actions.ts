"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteSpeakingHistory(id: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("speaking_evaluations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to delete speaking history:", error);
    throw new Error("Failed to delete speaking history");
  }

  revalidatePath("/dashboard/speaking");
}
