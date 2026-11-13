-- ==============================================================================
-- RePlate / NourishBridge — Food Donation Management System
-- Schema Migration: Complete Authentication, User Profiles, and RBAC with RLS
-- ==============================================================================

-- 1. Create Profiles Table (Linked 1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('donor', 'organization', 'admin')),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'Seattle, WA',
  -- Donor-specific fields
  donor_type TEXT CHECK (donor_type IN ('restaurant', 'individual')),
  restaurant_name TEXT,
  -- Organization-specific fields
  organization_name TEXT,
  contact_person TEXT,
  description TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for high-performance role & status lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_verification_status ON public.profiles(verification_status);

-- 2. Helper Security Function to check if the current session belongs to an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 3. Automatic Profile Creation Trigger on Supabase Auth Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_verification_status TEXT;
  v_full_name TEXT;
  v_donor_type TEXT;
  v_restaurant_name TEXT;
  v_organization_name TEXT;
  v_contact_person TEXT;
  v_phone TEXT;
  v_address TEXT;
  v_city TEXT;
  v_description TEXT;
BEGIN
  -- Extract role from metadata, strictly disallowing self-registered 'admin'
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'donor');
  IF v_role NOT IN ('donor', 'organization') THEN
    v_role := 'donor'; -- Neutralize any spoofed 'admin' requests during public registration
  END IF;

  -- Enforce verification status rules
  IF v_role = 'organization' THEN
    v_verification_status := 'pending'; -- All new NGOs start in pending status
    v_organization_name := NEW.raw_user_meta_data->>'organization_name';
    v_contact_person := NEW.raw_user_meta_data->>'contact_person';
    v_full_name := COALESCE(v_contact_person, NEW.raw_user_meta_data->>'full_name', 'Organization Representative');
    v_description := NEW.raw_user_meta_data->>'description';
  ELSE
    v_verification_status := 'verified'; -- Donors can list food immediately
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Food Donor');
    v_donor_type := NEW.raw_user_meta_data->>'donor_type';
    v_restaurant_name := NEW.raw_user_meta_data->>'restaurant_name';
  END IF;

  v_phone := NEW.raw_user_meta_data->>'phone';
  v_address := NEW.raw_user_meta_data->>'address';
  v_city := COALESCE(NEW.raw_user_meta_data->>'city', 'Seattle, WA');

  -- Insert profile record
  INSERT INTO public.profiles (
    id,
    role,
    full_name,
    email,
    phone,
    address,
    city,
    donor_type,
    restaurant_name,
    organization_name,
    contact_person,
    description,
    verification_status,
    avatar_url,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    v_role,
    v_full_name,
    NEW.email,
    v_phone,
    v_address,
    v_city,
    v_donor_type,
    v_restaurant_name,
    v_organization_name,
    v_contact_person,
    v_description,
    v_verification_status,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    ),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    address = EXCLUDED.address,
    updated_at = NOW();

  RETURN NEW;
END;
$$;

-- Drop and recreate the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Prevent Self-Privilege Escalation Trigger
-- Regular users cannot alter their own `role` or `verification_status`
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- If role or verification_status is being changed
  IF (OLD.role IS DISTINCT FROM NEW.role) OR (OLD.verification_status IS DISTINCT FROM NEW.verification_status) THEN
    -- Only allow if the modifying user is an authorized administrator
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Privilege Violation: Only system administrators can modify user roles or verification statuses.';
    END IF;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_profile_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_profile_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- 5. Enable Row-Level Security (RLS) on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy A: Anyone authenticated can view public profile details (necessary for donation listings & requests)
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
CREATE POLICY "profiles_select_policy"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy B: Users can insert their own profile (or trigger handles it)
DROP POLICY IF EXISTS "profiles_insert_self" ON public.profiles;
CREATE POLICY "profiles_insert_self"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy C: Users can update their own details, or Admins can update any profile
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
CREATE POLICY "profiles_update_policy"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

-- Policy D: Only Admins can delete profiles
DROP POLICY IF EXISTS "profiles_delete_admin" ON public.profiles;
CREATE POLICY "profiles_delete_admin"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- 6. Helper Script to Provision Initial Admin Account (Run once by DBA/Teacher)
-- ==============================================================================
-- To promote an existing user to admin, run this in Supabase SQL editor:
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'YOUR-AUTH-USER-UUID';
