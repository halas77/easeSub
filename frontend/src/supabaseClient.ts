// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwysmcocwvidndnhwmip.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eXNtY29jd3ZpZG5kbmh3bWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwOTIwODgsImV4cCI6MjA0NzY2ODA4OH0.tHW2tYOT9aydhcUx3X794f-YGYOvJ30RG-ByY4xY8Sw";
export const supabase = createClient(supabaseUrl, supabaseKey);
