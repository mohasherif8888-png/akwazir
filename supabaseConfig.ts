
import { createClient } from '@supabase/supabase-js';
import process from 'process';

// Use process.env as configured in vite.config.ts
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://faevssqrdjqjipzsrnza.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZXZzc3FyZGpxamlwenNybnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMDI1OTAsImV4cCI6MjA3OTg3ODU5MH0.7SuwffKpmsqlTb-_lAurZg180SeFsbsuT5xST15FuNk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
