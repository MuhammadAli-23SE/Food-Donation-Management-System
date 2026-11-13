-- ==============================================================================
-- RePlate / NourishBridge — Food Donation Management System
-- Phase 5 Migration: Enable Supabase Realtime Replication for Tables
-- ==============================================================================

-- 1. Enable Full Replica Identity so UPDATE and DELETE events include full row data
ALTER TABLE public.donations REPLICA IDENTITY FULL;
ALTER TABLE public.requests REPLICA IDENTITY FULL;
ALTER TABLE public.tracking REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

-- 2. Add Tables to supabase_realtime publication
DO $$
BEGIN
  -- Add public.donations
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'donations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
  END IF;

  -- Add public.requests
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'requests'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.requests;
  END IF;

  -- Add public.tracking
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'tracking'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.tracking;
  END IF;

  -- Add public.profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'profiles'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  END IF;
END $$;
