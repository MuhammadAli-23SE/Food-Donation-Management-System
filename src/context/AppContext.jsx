import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEMO_USERS,
  INITIAL_DONATIONS,
  INITIAL_REQUESTS,
  INITIAL_TRACKING,
  ORGANIZATIONS_LIST,
  SYSTEM_ACTIVITY
} from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  getDonations,
  createDonationRecord,
  updateDonationRecord,
  deleteDonationRecord,
  getRequests,
  createRequestRecord,
  updateRequestStatusRecord,
  getTrackingRecords,
  updateTrackingRecord,
  normalizeDonation,
  normalizeRequest,
  normalizeTracking
} from '../services/donationService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active user: starts with donor for immediate rich experience
  const [currentUser, setCurrentUser] = useState(DEMO_USERS.donor);
  const [currentRole, setCurrentRole] = useState("donor"); // "donor" | "organization" | "admin" | "visitor"

  // Core entities
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [trackingList, setTrackingList] = useState(INITIAL_TRACKING);
  const [organizations, setOrganizations] = useState(ORGANIZATIONS_LIST);
  const [activities, setActivities] = useState(SYSTEM_ACTIVITY);
  const [loadingDb, setLoadingDb] = useState(false);
  const [realtimeConnected, setRealtimeConnected] = useState(isSupabaseConfigured);

  // Notification Toast simulation
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Switch demo roles seamlessly
  const switchRole = (role) => {
    if (role === "visitor") {
      setCurrentUser(null);
      setCurrentRole("visitor");
      showToast("Browsing as Public Visitor", "info");
      return;
    }
    const targetUser = DEMO_USERS[role];
    if (targetUser) {
      setCurrentUser(targetUser);
      setCurrentRole(role);
      showToast(`Switched view to ${targetUser.name} (${role.toUpperCase()})`, "success");
    }
  };

  const loginAs = (role, customData = null) => {
    if (customData) {
      setCurrentUser(customData);
      setCurrentRole(customData.role || role);
      showToast(`Welcome back, ${customData.name}!`, "success");
      return;
    }
    switchRole(role);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole("visitor");
    showToast("Signed out successfully", "info");
  };

  const updateProfile = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
    showToast("Profile updated successfully", "success");
  };

  // Log activity
  const logActivity = (action, actor, actorRole, target, badge = "General") => {
    const newAct = {
      id: `act_${Date.now()}`,
      action,
      actor,
      actorRole,
      target,
      time: "Just now",
      badge
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // ==============================================================================
  // Synchronize Live Data with Supabase PostgreSQL
  // ==============================================================================
  useEffect(() => {
    const fetchLiveData = async () => {
      if (!isSupabaseConfigured) return;
      try {
        setLoadingDb(true);
        const [donationsRes, requestsRes, trackingRes, orgsRes] = await Promise.all([
          getDonations(),
          getRequests(),
          getTrackingRecords(),
          supabase.from('profiles').select('*').eq('role', 'organization')
        ]);

        if (donationsRes.data && donationsRes.data.length > 0) {
          setDonations(donationsRes.data);
        }
        if (requestsRes.data && requestsRes.data.length > 0) {
          setRequests(requestsRes.data);
        }
        if (trackingRes.data && trackingRes.data.length > 0) {
          setTrackingList(trackingRes.data);
        }
        if (orgsRes.data && orgsRes.data.length > 0) {
          const mapped = orgsRes.data.map((o) => ({
            id: o.id,
            name: o.organization_name || o.full_name,
            contactPerson: o.contact_person || o.full_name,
            email: o.email || '',
            phone: o.phone || '',
            address: o.address || '',
            city: o.city || 'Seattle, WA',
            verificationStatus: o.verification_status,
            description: o.description || 'Community welfare non-profit',
            mealsDistributed: 150,
            registrationNo: `501C3-${o.id.slice(0, 6).toUpperCase()}`,
            hygieneCertified: true,
          }));
          setOrganizations(mapped);
        }
      } catch (err) {
        console.warn('[AppContext] Could not load live records, fallback to mock data:', err);
      } finally {
        setLoadingDb(false);
      }
    };

    fetchLiveData();
  }, []);

  // ==============================================================================
  // Phase 5: Supabase Realtime Channel Subscription
  // ==============================================================================
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('replate-live-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = normalizeDonation(payload.new);
            setDonations((prev) => {
              if (prev.some((d) => d.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
            logActivity(
              "Donation Created",
              newItem.donorName || "Food Donor",
              "Donor",
              `${newItem.title} (${newItem.quantity} ${newItem.unit})`,
              "Live Feed"
            );
            showToast(`New surplus food listing: ${newItem.title}`, "info");
          } else if (payload.eventType === 'UPDATE') {
            const updated = normalizeDonation(payload.new);
            setDonations((prev) =>
              prev.map((d) => (d.id === updated.id ? { ...d, ...updated } : d))
            );
          } else if (payload.eventType === 'DELETE') {
            setDonations((prev) => prev.filter((d) => d.id !== payload.old.id));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'requests' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newReq = normalizeRequest(payload.new);
            setRequests((prev) => {
              if (prev.some((r) => r.id === newReq.id)) return prev;
              return [newReq, ...prev];
            });
            logActivity(
              "Request Submitted",
              newReq.organizationName || "Welfare NGO",
              "Organization",
              `${newReq.donationTitle}`,
              "Live Feed"
            );
            showToast(`New food allocation request received!`, "success");
          } else if (payload.eventType === 'UPDATE') {
            const updatedReq = normalizeRequest(payload.new);
            setRequests((prev) =>
              prev.map((r) => (r.id === updatedReq.id ? { ...r, ...updatedReq } : r))
            );
            if (updatedReq.status === 'approved') {
              showToast(`Food request for "${updatedReq.donationTitle}" was APPROVED!`, "success");
            } else if (updatedReq.status === 'rejected') {
              showToast(`Food request was declined.`, "info");
            }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tracking' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newTrk = normalizeTracking(payload.new);
            setTrackingList((prev) => [newTrk, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedTrk = normalizeTracking(payload.new);
            setTrackingList((prev) =>
              prev.map((t) => (t.id === updatedTrk.id ? { ...t, ...updatedTrk } : t))
            );
            showToast(`Logistics milestone updated: ${updatedTrk.status.replace('_', ' ').toUpperCase()}`, "info");
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setOrganizations((prev) =>
              prev.map((o) =>
                o.id === payload.new.id
                  ? { ...o, verificationStatus: payload.new.verification_status }
                  : o
              )
            );
            if (payload.new.verification_status === 'verified') {
              showToast(`Organization accreditation verified by Administrator!`, "success");
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeConnected(true);
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setRealtimeConnected(false);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ==============================================================================
  // DONATIONS CRUD
  // ==============================================================================
  const addDonation = async (newDonationData) => {
    const donorId = currentUser?.id;
    let createdRecord = null;

    // Check if live Supabase record can be created (UUID id check)
    if (isSupabaseConfigured && donorId && !donorId.startsWith('usr_')) {
      const { data, error } = await createDonationRecord(donorId, newDonationData);
      if (data && !error) {
        createdRecord = data;
      }
    }

    if (!createdRecord) {
      const newId = `don_${Date.now().toString().slice(-4)}`;
      createdRecord = {
        id: newId,
        donorId: donorId || "usr_donor_01",
        donorName: currentUser?.organizationName || currentUser?.name || "Artisan Donor",
        donorAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        status: "available",
        createdAt: new Date().toISOString(),
        ...newDonationData
      };
    }

    setDonations((prev) => [createdRecord, ...prev]);
    logActivity("Donation Created", createdRecord.donorName, "Donor", `${createdRecord.title} (${createdRecord.quantity} ${createdRecord.unit})`, "Listing");
    showToast("New surplus food donation posted!", "success");
    return createdRecord;
  };

  const updateDonation = async (id, fields) => {
    if (isSupabaseConfigured && !id.startsWith('don_')) {
      await updateDonationRecord(id, fields);
    }
    setDonations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
    showToast("Donation listing updated", "success");
  };

  const deleteDonation = async (id) => {
    if (isSupabaseConfigured && !id.startsWith('don_')) {
      await deleteDonationRecord(id);
    }
    setDonations((prev) => prev.filter((item) => item.id !== id));
    showToast("Donation removed", "info");
  };

  // ==============================================================================
  // REQUESTS MANAGEMENT
  // ==============================================================================
  const submitRequest = async (donationId, { requestedQuantity, notes }) => {
    const donation = donations.find((d) => d.id === donationId);
    if (!donation) return;

    const orgId = currentUser?.id;
    let newReq = null;

    if (isSupabaseConfigured && orgId && !orgId.startsWith('usr_') && !orgId.startsWith('org_')) {
      const { data, error } = await createRequestRecord(orgId, donationId, { requestedQuantity, notes });
      if (data && !error) {
        newReq = data;
      }
    }

    if (!newReq) {
      newReq = {
        id: `req_${Date.now().toString().slice(-4)}`,
        donationId,
        donationTitle: donation.title,
        donationImage: donation.imageUrl,
        organizationId: orgId || "usr_org_01",
        organizationName: currentUser?.organizationName || "Hope Community Kitchen",
        orgAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        donorId: donation.donorId,
        donorName: donation.donorName,
        requestedQuantity: requestedQuantity || `${donation.quantity} ${donation.unit}`,
        status: "pending",
        notes: notes || "Requested for immediate community meal service.",
        createdAt: new Date().toISOString()
      };
    }

    setRequests((prev) => [newReq, ...prev]);
    setDonations((prev) =>
      prev.map((d) => (d.id === donationId ? { ...d, status: "requested" } : d))
    );

    logActivity("Request Submitted", newReq.organizationName, "Organization", `${donation.title}`, "Request");
    showToast("Food request sent to donor for approval", "success");
    return newReq;
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    const targetReq = requests.find((r) => r.id === requestId);
    if (!targetReq) return;

    if (isSupabaseConfigured && !requestId.startsWith('req_')) {
      await updateRequestStatusRecord(requestId, newStatus);
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );

    // If approved, update donation to reserved and create tracking item
    if (newStatus === "approved") {
      setDonations((prev) =>
        prev.map((d) => (d.id === targetReq.donationId ? { ...d, status: "reserved" } : d))
      );

      const newTracking = {
        id: `trk_${Date.now().toString().slice(-4)}`,
        donationId: targetReq.donationId,
        requestId: targetReq.id,
        title: targetReq.donationTitle,
        donorName: targetReq.donorName,
        organizationName: targetReq.organizationName,
        status: "scheduled",
        pickupAddress: "Pickup location confirmed with donor",
        scheduledTime: "Today at 5:00 PM",
        driverName: "Assigned Volunteer Driver",
        beneficiaryTarget: 50,
        proofImage: null,
        distributionNotes: "",
        updatedAt: new Date().toISOString()
      };
      setTrackingList((prev) => [newTracking, ...prev]);
      logActivity("Request Approved", targetReq.donorName, "Donor", `${targetReq.organizationName} reserved food`, "Fulfillment");
      showToast("Request approved! Pickup tracking created.", "success");
    } else if (newStatus === "rejected") {
      setDonations((prev) =>
        prev.map((d) => (d.id === targetReq.donationId ? { ...d, status: "available" } : d))
      );
      showToast("Request declined. Food returned to available catalog.", "info");
    } else if (newStatus === "cancelled") {
      setDonations((prev) =>
        prev.map((d) => (d.id === targetReq.donationId ? { ...d, status: "available" } : d))
      );
      showToast("Request cancelled", "info");
    }
  };

  // ==============================================================================
  // TRACKING PROGRESS
  // ==============================================================================
  const updateTrackingStatus = async (trackingId, nextStatus, details = {}) => {
    if (isSupabaseConfigured && !trackingId.startsWith('trk_')) {
      await updateTrackingRecord(trackingId, nextStatus, details);
    }

    setTrackingList((prev) =>
      prev.map((item) => {
        if (item.id === trackingId) {
          const updated = {
            ...item,
            status: nextStatus,
            updatedAt: new Date().toISOString(),
            ...details
          };
          if (nextStatus === "distributed") {
            setDonations((dList) =>
              dList.map((d) => (d.id === item.donationId ? { ...d, status: "completed" } : d))
            );
            logActivity(
              "Distribution Completed",
              item.organizationName,
              "Organization",
              `${details.actualBeneficiaries || item.beneficiaryTarget} Beneficiaries Fed`,
              "Impact"
            );
          }
          return updated;
        }
        return item;
      })
    );
    showToast(`Status updated to: ${nextStatus.replace('_', ' ').toUpperCase()}`, "success");
  };

  // ==============================================================================
  // ADMIN VERIFICATION
  // ==============================================================================
  const verifyOrganization = async (orgId, status) => {
    if (isSupabaseConfigured && !orgId.startsWith('usr_') && !orgId.startsWith('org_')) {
      await supabase
        .from('profiles')
        .update({ verification_status: status })
        .eq('id', orgId);
    }

    setOrganizations((prev) =>
      prev.map((org) => (org.id === orgId ? { ...org, verificationStatus: status } : org))
    );
    const org = organizations.find((o) => o.id === orgId);
    logActivity(
      `Organization ${status === "verified" ? "Verified" : "Rejected"}`,
      "Admin",
      "Administrator",
      org?.name || orgId,
      "Compliance"
    );
    showToast(`Organization has been ${status}`, status === "verified" ? "success" : "info");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        loginAs,
        logout,
        updateProfile,
        donations,
        addDonation,
        updateDonation,
        deleteDonation,
        requests,
        submitRequest,
        updateRequestStatus,
        trackingList,
        updateTrackingStatus,
        organizations,
        verifyOrganization,
        activities,
        logActivity,
        toast,
        showToast,
        loadingDb,
        realtimeConnected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
