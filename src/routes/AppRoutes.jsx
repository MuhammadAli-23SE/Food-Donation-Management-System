import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Auth Route Guards
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { RoleBasedRoute } from '../components/auth/RoleBasedRoute';
import { PublicOnlyRoute } from '../components/auth/PublicOnlyRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { ExplorePage } from '../pages/public/ExplorePage';
import { DonationDetailsPage } from '../pages/public/DonationDetailsPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Organization Verification Pending Screen
import { PendingVerificationPage } from '../pages/organization/PendingVerificationPage';

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
        
        {/* Auth Pages (Protected with PublicOnlyRoute to redirect authenticated users to their dashboard) */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Organization Status Audit Screen */}
        <Route
          path="/organization/pending"
          element={
            <ProtectedRoute>
              <PendingVerificationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/org/pending" element={<Navigate to="/organization/pending" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Donor Workspace Routes (Strictly restricted to role: donor) */}
      <Route
        path="/donor"
        element={
          <RoleBasedRoute allowedRoles={['donor']}>
            <DashboardLayout role="donor" />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Navigate to="/donor/dashboard" replace />} />
        <Route path="dashboard" element={<DonorDashboard />} />
        <Route path="donations" element={<ManageDonationsPage />} />
        <Route path="create" element={<CreateDonationPage />} />
        <Route path="requests" element={<DonorRequestsPage />} />
        <Route path="profile" element={<DonorProfilePage />} />
      </Route>

      {/* Organization Workspace Routes (Strictly restricted to role: organization) */}
      <Route
        path="/organization"
        element={
          <RoleBasedRoute allowedRoles={['organization']}>
            <DashboardLayout role="organization" />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Navigate to="/organization/dashboard" replace />} />
        <Route path="dashboard" element={<OrgDashboard />} />
        <Route path="browse" element={<BrowseDonationsPage />} />
        {/* Sensitive workflows blocked if unverified/pending */}
        <Route
          path="requests"
          element={
            <RoleBasedRoute allowedRoles={['organization']} requireVerified={true}>
              <MyRequestsPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="tracking"
          element={
            <RoleBasedRoute allowedRoles={['organization']} requireVerified={true}>
              <TrackDistributionPage />
            </RoleBasedRoute>
          }
        />
        <Route path="profile" element={<OrgProfilePage />} />
      </Route>

      {/* Backward-compatibility and shorthand alias /org -> /organization */}
      <Route path="/org" element={<Navigate to="/organization/dashboard" replace />} />
      <Route path="/org/dashboard" element={<Navigate to="/organization/dashboard" replace />} />
      <Route path="/org/browse" element={<Navigate to="/organization/browse" replace />} />
      <Route path="/org/requests" element={<Navigate to="/organization/requests" replace />} />
      <Route path="/org/tracking" element={<Navigate to="/organization/tracking" replace />} />
      <Route path="/org/profile" element={<Navigate to="/organization/profile" replace />} />

      {/* Admin Workspace Routes (Strictly restricted to role: admin) */}
      <Route
        path="/admin"
        element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <DashboardLayout role="admin" />
          </RoleBasedRoute>
        }
      >
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
