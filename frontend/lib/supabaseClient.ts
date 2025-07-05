import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bulouzervffrbqgxgbfj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bG91emVydmZmcmJxZ3hnYmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTEyODIsImV4cCI6MjA2NzA2NzI4Mn0.0T3IG40bZqWeB8yrKUHKoQXc44r06qo3gmeRSloJpDc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
