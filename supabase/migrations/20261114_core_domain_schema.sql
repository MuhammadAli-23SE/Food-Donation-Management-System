-- ==============================================================================
-- RePlate / NourishBridge — Food Donation Management System
-- Phase 4 Migration: Core Domain Schema (Donations, Requests, Tracking, & Storage)
-- ==============================================================================

-- 1. Create Donations Table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'cooked' CHECK (type IN ('cooked', 'bakery', 'produce', 'packaged', 'dairy', 'beverages', 'pantry', 'other')),
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'servings',
  estimated_servings INT DEFAULT 1,
  expiry_time TEXT,
  expiry_hours_left INT DEFAULT 24,
  pickup_address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Seattle, WA',
  storage_instructions TEXT,
  image_url TEXT,
  dietary TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'requested', 'reserved', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at DESC);

-- 2. Create Requests Table
CREATE TABLE IF NOT EXISTS public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  requested_quantity TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_requests_donation_id ON public.requests(donation_id);
CREATE INDEX IF NOT EXISTS idx_requests_organization_id ON public.requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.requests(status);

-- 3. Create Tracking Table (Logistics & Distribution Milestones)
CREATE TABLE IF NOT EXISTS public.tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  request_id UUID REFERENCES public.requests(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_transit', 'picked_up', 'distributed')),
  pickup_address TEXT,
  scheduled_time TEXT DEFAULT 'Today at 5:00 PM',
  driver_name TEXT DEFAULT 'Assigned Volunteer Driver',
  beneficiary_target INT DEFAULT 50,
  actual_beneficiaries INT,
  proof_image TEXT,
  distribution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tracking_donation_id ON public.tracking(donation_id);
CREATE INDEX IF NOT EXISTS idx_tracking_request_id ON public.tracking(request_id);
CREATE INDEX IF NOT EXISTS idx_tracking_status ON public.tracking(status);

-- ==============================================================================
-- 4. Automatic Workflow Triggers (Fulfillment Automation)
-- ==============================================================================

-- A. Auto-reserve donation and create tracking row when request is approved
CREATE OR REPLACE FUNCTION public.handle_request_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_donation RECORD;
BEGIN
  -- When request is approved
  IF NEW.status = 'approved' AND (OLD.status IS DISTINCT FROM 'approved') THEN
    SELECT * INTO v_donation FROM public.donations WHERE id = NEW.donation_id;
    
    -- Update donation status to reserved
    UPDATE public.donations
    SET status = 'reserved', updated_at = NOW()
    WHERE id = NEW.donation_id;

    -- Create tracking record if one does not already exist
    IF NOT EXISTS (SELECT 1 FROM public.tracking WHERE request_id = NEW.id) THEN
      INSERT INTO public.tracking (
        donation_id,
        request_id,
        status,
        pickup_address,
        scheduled_time,
        driver_name,
        beneficiary_target
      ) VALUES (
        NEW.donation_id,
        NEW.id,
        'scheduled',
        v_donation.pickup_address,
        'Today at 5:00 PM',
        'Assigned Volunteer Driver',
        COALESCE(v_donation.estimated_servings, 50)
      );
    END IF;

  -- When request is rejected or cancelled, revert donation to available if no other approved requests
  ELSIF (NEW.status IN ('rejected', 'cancelled')) AND (OLD.status = 'approved' OR OLD.status = 'pending') THEN
    IF NOT EXISTS (SELECT 1 FROM public.requests WHERE donation_id = NEW.donation_id AND status = 'approved' AND id != NEW.id) THEN
      UPDATE public.donations
      SET status = 'available', updated_at = NOW()
      WHERE id = NEW.donation_id;
    END IF;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_request_status_change ON public.requests;
CREATE TRIGGER trg_request_status_change
  AFTER UPDATE ON public.requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_request_status_change();

-- B. When tracking reaches 'distributed', mark donation as 'completed'
CREATE OR REPLACE FUNCTION public.handle_tracking_milestone()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'distributed' AND (OLD.status IS DISTINCT FROM 'distributed') THEN
    UPDATE public.donations
    SET status = 'completed', updated_at = NOW()
    WHERE id = NEW.donation_id;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_tracking_milestone ON public.tracking;
CREATE TRIGGER trg_tracking_milestone
  AFTER UPDATE ON public.tracking
  FOR EACH ROW EXECUTE FUNCTION public.handle_tracking_milestone();

-- ==============================================================================
-- 5. Row-Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking ENABLE ROW LEVEL SECURITY;

-- ----------------- DONATIONS RLS -----------------
-- Anyone can view available, requested, reserved, or completed listings
DROP POLICY IF EXISTS "donations_public_read" ON public.donations;
CREATE POLICY "donations_public_read"
  ON public.donations FOR SELECT
  USING (true);

-- Authenticated donors or admins can create listings
DROP POLICY IF EXISTS "donations_donor_insert" ON public.donations;
CREATE POLICY "donations_donor_insert"
  ON public.donations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = donor_id AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('donor', 'admin')
      )
    )
  );

-- Owner or admin can update listings
DROP POLICY IF EXISTS "donations_owner_update" ON public.donations;
CREATE POLICY "donations_owner_update"
  ON public.donations FOR UPDATE
  TO authenticated
  USING (donor_id = auth.uid() OR public.is_admin())
  WITH CHECK (donor_id = auth.uid() OR public.is_admin());

-- Owner or admin can delete listings
DROP POLICY IF EXISTS "donations_owner_delete" ON public.donations;
CREATE POLICY "donations_owner_delete"
  ON public.donations FOR DELETE
  TO authenticated
  USING (donor_id = auth.uid() OR public.is_admin());

-- ----------------- REQUESTS RLS -----------------
-- Organizations see their own requests; Donors see requests for their donations; Admins see all
DROP POLICY IF EXISTS "requests_select_policy" ON public.requests;
CREATE POLICY "requests_select_policy"
  ON public.requests FOR SELECT
  TO authenticated
  USING (
    organization_id = auth.uid() OR
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.donations
      WHERE donations.id = requests.donation_id AND donations.donor_id = auth.uid()
    )
  );

-- Only VERIFIED organizations (or admin) can submit food reservation requests
DROP POLICY IF EXISTS "requests_verified_org_insert" ON public.requests;
CREATE POLICY "requests_verified_org_insert"
  ON public.requests FOR INSERT
  TO authenticated
  WITH CHECK (
    organization_id = auth.uid() AND (
      public.is_admin() OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'organization' AND verification_status = 'verified'
      )
    )
  );

-- Donors can update status (approve/reject), Organizations can cancel, Admins can update
DROP POLICY IF EXISTS "requests_update_policy" ON public.requests;
CREATE POLICY "requests_update_policy"
  ON public.requests FOR UPDATE
  TO authenticated
  USING (
    organization_id = auth.uid() OR
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.donations
      WHERE donations.id = requests.donation_id AND donations.donor_id = auth.uid()
    )
  );

-- Requesting organization or admin can delete
DROP POLICY IF EXISTS "requests_delete_policy" ON public.requests;
CREATE POLICY "requests_delete_policy"
  ON public.requests FOR DELETE
  TO authenticated
  USING (organization_id = auth.uid() OR public.is_admin());

-- ----------------- TRACKING RLS -----------------
-- Participants (donor, organization) or admin can view tracking
DROP POLICY IF EXISTS "tracking_select_policy" ON public.tracking;
CREATE POLICY "tracking_select_policy"
  ON public.tracking FOR SELECT
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.donations
      WHERE donations.id = tracking.donation_id AND donations.donor_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.requests
      WHERE requests.id = tracking.request_id AND requests.organization_id = auth.uid()
    )
  );

-- Participants or admin can update tracking
DROP POLICY IF EXISTS "tracking_update_policy" ON public.tracking;
CREATE POLICY "tracking_update_policy"
  ON public.tracking FOR UPDATE
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.donations
      WHERE donations.id = tracking.donation_id AND donations.donor_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.requests
      WHERE requests.id = tracking.request_id AND requests.organization_id = auth.uid()
    )
  );

-- ==============================================================================
-- 6. Supabase Storage: Public Bucket for Food Photos
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('food-donations', 'food-donations', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy to allow anyone to read images from the food-donations bucket
DROP POLICY IF EXISTS "public_view_food_photos" ON storage.objects;
CREATE POLICY "public_view_food_photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'food-donations');

-- Policy to allow authenticated users to upload photos into the food-donations bucket
DROP POLICY IF EXISTS "authenticated_upload_food_photos" ON storage.objects;
CREATE POLICY "authenticated_upload_food_photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'food-donations');

-- Policy to allow users to update/delete their own uploaded images
DROP POLICY IF EXISTS "owner_manage_food_photos" ON storage.objects;
CREATE POLICY "owner_manage_food_photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'food-donations' AND (auth.uid() = owner OR public.is_admin()));
