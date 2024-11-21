import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hrkzxossdtwzarjtofuw.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY!;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya3p4b3NzZHR3emFyanRvZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMDE0MTAsImV4cCI6MjA0Nzc3NzQxMH0.MDguUBbQIRNa_bVyjUHZ3E0vePVcv_8It71b7TRjSxA";

export const supabase = createClient(supabaseUrl, supabaseKey);
