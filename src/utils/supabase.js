import { createClient } from "@supabase/supabase-js";

const projectURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const projectAPI = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(projectURL, projectAPI);

export async function testConnection() {
  let { data } = await supabase.from("countries").select();
  console.log(data);
  return data;
}
