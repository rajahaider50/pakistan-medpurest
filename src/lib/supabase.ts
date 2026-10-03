import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oatuzfbcxxfoiumigywn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdHV6ZmJjeHhmb2l1bWlneXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDI1OTksImV4cCI6MjEwNjAxODU5OX0.Q2lCQausoXe2JUTWbufhmpnFuOBI2kHoZRTuYdgOiy0';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdHV6ZmJjeHhmb2l1bWlneXduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDQ0MjU5OSwiZXhwIjoyMTA2MDE4NTk5fQ.aQcbV31wMfSda-ODEt6Yjo6TfLt3G4bSQMGc9B2W0Rg';

// Public browser client (Anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (Service role key, bypasses RLS for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
