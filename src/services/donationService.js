import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Normalizes a database donation row into the shape expected by UI components.
 */
export const normalizeDonation = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    donorId: row.donor_id,
    donorName: row.donor?.restaurant_name || row.donor?.full_name || 'Artisan Donor',
    donorAvatar: row.donor?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    donorType: row.donor?.donor_type || 'restaurant',
    title: row.title,
    description: row.description,
    type: row.type,
    quantity: Number(row.quantity) || 1,
    unit: row.unit || 'servings',
    estimatedServings: row.estimated_servings || row.quantity || 1,
    expiryTime: row.expiry_time || 'Today',
    expiryHoursLeft: row.expiry_hours_left || 12,
    pickupAddress: row.pickup_address,
    city: row.city || 'Seattle, WA',
    storageInstructions: row.storage_instructions || '',
    imageUrl: row.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    dietary: row.dietary || [],
    status: row.status || 'available',
    createdAt: row.created_at,
  };
};

/**
 * Normalizes a database request row.
 */
export const normalizeRequest = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    donationId: row.donation_id,
    donationTitle: row.donation?.title || 'Surplus Food Offering',
    donationImage: row.donation?.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    organizationId: row.organization_id,
    organizationName: row.organization?.organization_name || row.organization?.full_name || 'Community Pantry',
    orgAvatar: row.organization?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    donorId: row.donation?.donor_id,
    donorName: 'Partner Donor',
    requestedQuantity: row.requested_quantity,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
  };
};

/**
 * Normalizes a database tracking row.
 */
export const normalizeTracking = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    donationId: row.donation_id,
    requestId: row.request_id,
    title: row.donation?.title || 'Scheduled Food Distribution',
    donorName: 'Partner Donor',
    organizationName: 'Community Welfare Center',
    status: row.status,
    pickupAddress: row.pickup_address || 'Pickup location confirmed',
    scheduledTime: row.scheduled_time || 'Today at 5:00 PM',
    driverName: row.driver_name || 'Assigned Volunteer Driver',
    beneficiaryTarget: row.beneficiary_target || 50,
    actualBeneficiaries: row.actual_beneficiaries,
    proofImage: row.proof_image,
    distributionNotes: row.distribution_notes || '',
    updatedAt: row.updated_at,
  };
};

// ==============================================================================
// 1. DONATIONS CRUD
// ==============================================================================

export const getDonations = async () => {
  if (!isSupabaseConfigured) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*, donor:profiles!donor_id(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []).map(normalizeDonation), error: null };
  } catch (err) {
    console.warn('[DonationService] getDonations error:', err.message);
    return { data: null, error: err };
  }
};

export const createDonationRecord = async (donorId, donationData) => {
  if (!isSupabaseConfigured) return { data: null, error: null };
  try {
    const payload = {
      donor_id: donorId,
      title: donationData.title,
      description: donationData.description,
      type: donationData.type || 'cooked',
      quantity: Number(donationData.quantity) || 1,
      unit: donationData.unit || 'servings',
      estimated_servings: Number(donationData.estimatedServings) || 1,
      expiry_time: donationData.expiryTime,
      expiry_hours_left: Number(donationData.expiryHoursLeft) || 12,
      pickup_address: donationData.pickupAddress,
      city: donationData.city || 'Seattle, WA',
      storage_instructions: donationData.storageInstructions || '',
      image_url: donationData.imageUrl,
      dietary: donationData.dietary || [],
      status: 'available',
    };

    const { data, error } = await supabase
      .from('donations')
      .insert([payload])
      .select('*, donor:profiles!donor_id(*)')
      .single();

    if (error) throw error;
    return { data: normalizeDonation(data), error: null };
  } catch (err) {
    console.warn('[DonationService] createDonationRecord error:', err.message);
    return { data: null, error: err };
  }
};

export const updateDonationRecord = async (id, fields) => {
  if (!isSupabaseConfigured) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('donations')
      .update(fields)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('[DonationService] updateDonationRecord error:', err.message);
    return { data: null, error: err };
  }
};

export const deleteDonationRecord = async (id) => {
  if (!isSupabaseConfigured) return { error: null };
  try {
    const { error } = await supabase
      .from('donations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.warn('[DonationService] deleteDonationRecord error:', err.message);
    return { error: err };
  }
};

// ==============================================================================
// 2. REQUESTS CRUD
// ==============================================================================

export const getRequests = async () => {
  if (!isSupabaseConfigured) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('requests')
      .select('*, donation:donations(*), organization:profiles!organization_id(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []).map(normalizeRequest), error: null };
  } catch (err) {
    console.warn('[DonationService] getRequests error:', err.message);
    return { data: null, error: err };
  }
};

export const createRequestRecord = async (orgId, donationId, { requestedQuantity, notes }) => {
  if (!isSupabaseConfigured) return { data: null, error: null };
  try {
    const payload = {
      donation_id: donationId,
      organization_id: orgId,
      requested_quantity: requestedQuantity,
      notes: notes || 'Requested for immediate community meal service.',
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('requests')
      .insert([payload])
      .select('*, donation:donations(*), organization:profiles!organization_id(*)')
      .single();

    if (error) throw error;
    return { data: normalizeRequest(data), error: null };
  } catch (err) {
    console.warn('[DonationService] createRequestRecord error:', err.message);
    return { data: null, error: err };
  }
};

export const updateRequestStatusRecord = async (requestId, status) => {
  if (!isSupabaseConfigured) return { error: null };
  try {
    const { data, error } = await supabase
      .from('requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('[DonationService] updateRequestStatusRecord error:', err.message);
    return { error: err };
  }
};

// ==============================================================================
// 3. TRACKING CRUD
// ==============================================================================

export const getTrackingRecords = async () => {
  if (!isSupabaseConfigured) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('tracking')
      .select('*, donation:donations(*), request:requests(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []).map(normalizeTracking), error: null };
  } catch (err) {
    console.warn('[DonationService] getTrackingRecords error:', err.message);
    return { data: null, error: err };
  }
};

export const updateTrackingRecord = async (trackingId, status, details = {}) => {
  if (!isSupabaseConfigured) return { error: null };
  try {
    const payload = {
      status,
      ...details,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tracking')
      .update(payload)
      .eq('id', trackingId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('[DonationService] updateTrackingRecord error:', err.message);
    return { error: err };
  }
};
