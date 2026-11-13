import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { ExplorePage } from '../pages/public/ExplorePage';
import { DonationDetailsPage } from '../pages/public/DonationDetailsPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Donor Pages
import { DonorDashboard } from '../pages/donor/DonorDashboard';
import { CreateDonationPage } from '../pages/donor/CreateDonationPage';
import { ManageDonationsPage } from '../pages/donor/ManageDonationsPage';
import { DonorRequestsPage } from '../pages/donor/DonorRequestsPage';
import { DonorProfilePage } from '../pages/donor/DonorProfilePage';

// Organization Pages
import { OrgDashboard } from '../pages/organization/OrgDashboard';
import { BrowseDonationsPage } from '../pages/organization/BrowseDonationsPage';
import { MyRequestsPage } from '../pages/organization/MyRequestsPage';
import { TrackDistributionPage } from '../pages/organization/TrackDistributionPage';
import { OrgProfilePage } from '../pages/organization/OrgProfilePage';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { VerifyOrgsPage } from '../pages/admin/VerifyOrgsPage';
import { ManageUsersPage } from '../pages/admin/ManageUsersPage';
import { ManageDonationsAdminPage } from '../pages/admin/ManageDonationsAdminPage';
import { RequestLogsAdminPage } from '../pages/admin/RequestLogsAdminPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with PublicLayout (Navbar & Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/donations/:id" element={<DonationDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Donor Workspace Routes */}
      <Route path="/donor" element={<DashboardLayout role="donor" />}>
        <Route index element={<Navigate to="/donor/dashboard" replace />} />
        <Route path="dashboard" element={<DonorDashboard />} />
        <Route path="donations" element={<ManageDonationsPage />} />
        <Route path="create" element={<CreateDonationPage />} />
        <Route path="requests" element={<DonorRequestsPage />} />
        <Route path="profile" element={<DonorProfilePage />} />
      </Route>

      {/* Organization Workspace Routes */}
      <Route path="/org" element={<DashboardLayout role="organization" />}>
        <Route index element={<Navigate to="/org/dashboard" replace />} />
        <Route path="dashboard" element={<OrgDashboard />} />
        <Route path="browse" element={<BrowseDonationsPage />} />
        <Route path="requests" element={<MyRequestsPage />} />
        <Route path="tracking" element={<TrackDistributionPage />} />
        <Route path="profile" element={<OrgProfilePage />} />
      </Route>

      {/* Admin Workspace Routes */}
      <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="verifications" element={<VerifyOrgsPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="donations" element={<ManageDonationsAdminPage />} />
        <Route path="requests" element={<RequestLogsAdminPage />} />
      </Route>
    </Routes>
  );
};
