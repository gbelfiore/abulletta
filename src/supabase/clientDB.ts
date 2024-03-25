import { createClient } from "@supabase/supabase-js";
const url = "https://pfvmyqdifuesffclwsvj.supabase.co";
const apiKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdm15cWRpZnVlc2ZmY2x3c3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNTM2MDQsImV4cCI6MjAyNjkyOTYwNH0.HbkbUOcEYrZpX5Ndl2PcXGiQnCe4bNCrdS1xU6CXX8I";

const clientDB = createClient(url, apiKey);

export default clientDB;
