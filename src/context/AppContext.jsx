import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEMO_USERS,
  INITIAL_DONATIONS,
  INITIAL_REQUESTS,
  INITIAL_TRACKING,
  ORGANIZATIONS_LIST,
  SYSTEM_ACTIVITY
} from '../data/mockData';

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

  // DONATIONS CRUD
  const addDonation = (newDonationData) => {
    const newId = `don_${Date.now().toString().slice(-4)}`;
    const newDonation = {
      id: newId,
      donorId: currentUser?.id || "usr_donor_01",
      donorName: currentUser?.organizationName || currentUser?.name || "Artisan Donor",
      donorAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      status: "available",
      createdAt: new Date().toISOString(),
      ...newDonationData
    };
    setDonations((prev) => [newDonation, ...prev]);
    logActivity("Donation Created", newDonation.donorName, "Donor", `${newDonation.title} (${newDonation.quantity} ${newDonation.unit})`, "Listing");
    showToast("New surplus food donation posted!", "success");
    return newDonation;
  };

  const updateDonation = (id, fields) => {
    setDonations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
    showToast("Donation listing updated", "success");
  };

  const deleteDonation = (id) => {
    setDonations((prev) => prev.filter((item) => item.id !== id));
    showToast("Donation removed", "info");
  };

  // REQUESTS MANAGEMENT
  const submitRequest = (donationId, { requestedQuantity, notes }) => {
    const donation = donations.find((d) => d.id === donationId);
    if (!donation) return;

    const newReq = {
      id: `req_${Date.now().toString().slice(-4)}`,
      donationId,
      donationTitle: donation.title,
      donationImage: donation.imageUrl,
      organizationId: currentUser?.id || "usr_org_01",
      organizationName: currentUser?.organizationName || "Hope Community Kitchen",
      orgAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      donorId: donation.donorId,
      donorName: donation.donorName,
      requestedQuantity: requestedQuantity || `${donation.quantity} ${donation.unit}`,
      status: "pending",
      notes: notes || "Requested for immediate community meal service.",
      createdAt: new Date().toISOString()
    };

    setRequests((prev) => [newReq, ...prev]);
    // update donation status to requested
    setDonations((prev) =>
      prev.map((d) => (d.id === donationId ? { ...d, status: "requested" } : d))
    );

    logActivity("Request Submitted", newReq.organizationName, "Organization", `${donation.title}`, "Request");
    showToast("Food request sent to donor for approval", "success");
    return newReq;
  };

  const updateRequestStatus = (requestId, newStatus) => {
    const targetReq = requests.find((r) => r.id === requestId);
    if (!targetReq) return;

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
      // Revert donation to available
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

  // TRACKING PROGRESS
  const updateTrackingStatus = (trackingId, nextStatus, details = {}) => {
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
            // mark donation as completed
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

  // ADMIN VERIFICATION
  const verifyOrganization = (orgId, status) => {
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
        showToast
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
