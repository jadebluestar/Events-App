import { auth } from "@clerk/nextjs/server";
import { supabase } from "../../lib/supabase";

export async function POST() {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("users")
    .upsert({ clerk_id: userId, tier: "free" }, { onConflict: "clerk_id" });

  if (error) return new Response(JSON.stringify(error), { status: 500 });

  return new Response(JSON.stringify({ success: true, user: data }), { status: 200 });
}
