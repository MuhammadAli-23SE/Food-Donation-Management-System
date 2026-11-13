import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { DEMO_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Fetch full user profile from PostgreSQL profiles table
  const fetchProfile = useCallback(async (userId, fallbackMeta = null) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.warn('[Auth] Error fetching profile:', error.message);
        }

        if (data) {
          setProfile(data);
          return data;
        }
      } catch (err) {
        console.warn('[Auth] Exception fetching profile:', err);
      }
    }

    // Fallback profile if database row is not yet created or working offline
    const synthesized = {
      id: userId,
      role: fallbackMeta?.role || 'donor',
      full_name: fallbackMeta?.full_name || fallbackMeta?.contact_person || 'User',
      email: fallbackMeta?.email || '',
      phone: fallbackMeta?.phone || '',
      address: fallbackMeta?.address || '',
      city: fallbackMeta?.city || 'Seattle, WA',
      donor_type: fallbackMeta?.donor_type || 'individual',
      restaurant_name: fallbackMeta?.restaurant_name || '',
      organization_name: fallbackMeta?.organization_name || '',
      contact_person: fallbackMeta?.contact_person || '',
      description: fallbackMeta?.description || '',
      verification_status: fallbackMeta?.role === 'organization' ? 'pending' : 'verified',
      avatar_url: fallbackMeta?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
    setProfile(synthesized);
    return synthesized;
  }, []);

  // Initialize session restoration on application mount
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setLoading(true);

        if (isSupabaseConfigured) {
          // 1. Get current active session
          const { data: { session: initialSession }, error } = await supabase.auth.getSession();
          if (error) {
            console.warn('[Auth] Session restoration error:', error.message);
          }

          if (initialSession?.user && mounted) {
            setSession(initialSession);
            setUser(initialSession.user);
            await fetchProfile(initialSession.user.id, initialSession.user.user_metadata);
          }
        } else {
          // Check local storage for simulated persistent session if offline/unconfigured
          const savedMockUser = localStorage.getItem('replate_mock_session');
          if (savedMockUser && mounted) {
            try {
              const parsed = JSON.parse(savedMockUser);
              setUser(parsed.user);
              setProfile(parsed.profile);
              setSession({ access_token: 'mock-token', user: parsed.user });
            } catch (e) {
              localStorage.removeItem('replate_mock_session');
            }
          }
        }
      } catch (err) {
        console.error('[Auth] Unexpected init error:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // 2. Listen to real-time auth state changes in Supabase
    let authListener = null;
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          if (!mounted) return;

          setSession(newSession);
          setUser(newSession?.user || null);

          if (newSession?.user) {
            await fetchProfile(newSession.user.id, newSession.user.user_metadata);
          } else {
            setProfile(null);
          }

          if (event === 'SIGNED_OUT') {
            setProfile(null);
            setUser(null);
            setSession(null);
          }

          setLoading(false);
        }
      );
      authListener = subscription;
    }

    return () => {
      mounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, [fetchProfile]);

  // ==========================================
  // SIGN UP (Donor or Organization only)
  // ==========================================
  const signUpDonor = async ({ email, password, fullName, phone, address, city, donorType, restaurantName }) => {
    setAuthError(null);
    setLoading(true);

    const metadata = {
      role: 'donor',
      full_name: fullName,
      phone,
      address,
      city: city || 'Seattle, WA',
      donor_type: donorType || 'restaurant',
      restaurant_name: donorType === 'restaurant' ? restaurantName : null,
      verification_status: 'verified', // Donors start ready
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });

        if (error) {
          setAuthError(error.message);
          setLoading(false);
          return { error };
        }

        // If auto-confirm is on in Supabase, fetch profile immediately
        if (data.user) {
          setUser(data.user);
          setSession(data.session);
          await fetchProfile(data.user.id, metadata);
        }

        setLoading(false);
        return { data, error: null };
      } catch (err) {
        setAuthError(err.message || 'Registration failed');
        setLoading(false);
        return { error: err };
      }
    } else {
      // Simulated signup when unconfigured/offline
      const mockId = `usr_${Date.now()}`;
      const mockUser = {
        id: mockId,
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString(),
      };
      const mockProfile = {
        id: mockId,
        ...metadata,
        created_at: new Date().toISOString(),
      };
      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ access_token: 'mock-session-token', user: mockUser });
      localStorage.setItem('replate_mock_session', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return { data: { user: mockUser, session: true }, error: null };
    }
  };

  const signUpOrganization = async ({ email, password, organizationName, contactPerson, phone, address, city, description }) => {
    setAuthError(null);
    setLoading(true);

    const metadata = {
      role: 'organization',
      organization_name: organizationName,
      contact_person: contactPerson,
      full_name: contactPerson,
      phone,
      address,
      city: city || 'Seattle, WA',
      description,
      verification_status: 'pending', // Strict rule: new NGOs must be pending!
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });

        if (error) {
          setAuthError(error.message);
          setLoading(false);
          return { error };
        }

        if (data.user) {
          setUser(data.user);
          setSession(data.session);
          await fetchProfile(data.user.id, metadata);
        }

        setLoading(false);
        return { data, error: null };
      } catch (err) {
        setAuthError(err.message || 'Registration failed');
        setLoading(false);
        return { error: err };
      }
    } else {
      // Simulated organization signup
      const mockId = `org_${Date.now()}`;
      const mockUser = {
        id: mockId,
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString(),
      };
      const mockProfile = {
        id: mockId,
        ...metadata,
        created_at: new Date().toISOString(),
      };
      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ access_token: 'mock-session-token', user: mockUser });
      localStorage.setItem('replate_mock_session', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return { data: { user: mockUser, session: true }, error: null };
    }
  };

  // ==========================================
  // SIGN IN
  // ==========================================
  const signIn = async ({ email, password }) => {
    setAuthError(null);
    setLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setAuthError(error.message);
          setLoading(false);
          return { error };
        }

        if (data?.user) {
          setUser(data.user);
          setSession(data.session);
          const loadedProfile = await fetchProfile(data.user.id, data.user.user_metadata);
          setLoading(false);
          return { data, profile: loadedProfile, error: null };
        }
      } catch (err) {
        setAuthError(err.message || 'Sign in failed');
        setLoading(false);
        return { error: err };
      }
    } else {
      // Offline / fallback credential check against demo accounts
      let matchedRole = 'donor';
      let demo = DEMO_USERS.donor;

      if (email.toLowerCase().includes('hope') || email.toLowerCase().includes('org') || email.toLowerCase().includes('ngo')) {
        matchedRole = 'organization';
        demo = DEMO_USERS.organization;
      } else if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('nourishbridge')) {
        matchedRole = 'admin';
        demo = DEMO_USERS.admin;
      }

      const mockUser = {
        id: demo.id,
        email: email || demo.email,
        user_metadata: { role: matchedRole, full_name: demo.name },
      };
      const mockProfile = {
        id: demo.id,
        role: matchedRole,
        full_name: demo.name,
        email: demo.email,
        phone: demo.phone,
        address: demo.address,
        city: demo.city,
        organization_name: demo.organizationName,
        verification_status: matchedRole === 'organization' ? 'verified' : 'verified',
        avatar_url: demo.avatar,
      };

      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ access_token: 'mock-session', user: mockUser });
      localStorage.setItem('replate_mock_session', JSON.stringify({ user: mockUser, profile: mockProfile }));
      setLoading(false);
      return { data: { user: mockUser, session: true }, profile: mockProfile, error: null };
    }
  };

  // Quick Persona Sign In (for academic viva & evaluation)
  const signInAsPersona = (role) => {
    const demo = DEMO_USERS[role];
    if (!demo) return;

    const mockUser = {
      id: demo.id,
      email: demo.email,
      user_metadata: { role, full_name: demo.name },
    };
    const mockProfile = {
      id: demo.id,
      role,
      full_name: demo.name,
      email: demo.email,
      phone: demo.phone,
      address: demo.address,
      city: demo.city,
      organization_name: demo.organizationName,
      verification_status: role === 'organization' ? demo.verificationStatus || 'verified' : 'verified',
      avatar_url: demo.avatar,
    };

    setUser(mockUser);
    setProfile(mockProfile);
    setSession({ access_token: `mock-session-${role}`, user: mockUser });
    localStorage.setItem('replate_mock_session', JSON.stringify({ user: mockUser, profile: mockProfile }));
    return mockProfile;
  };

  // ==========================================
  // SIGN OUT
  // ==========================================
  const signOut = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('replate_mock_session');
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (err) {
      console.warn('[Auth] Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PASSWORD RESET
  // ==========================================
  const resetPassword = async (email) => {
    setAuthError(null);
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { data, error };
    } else {
      // Simulated email dispatch
      await new Promise((r) => setTimeout(r, 600));
      return { data: true, error: null };
    }
  };

  const updatePassword = async (newPassword) => {
    setAuthError(null);
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { data, error };
    } else {
      await new Promise((r) => setTimeout(r, 500));
      return { data: true, error: null };
    }
  };

  // Helper to re-fetch database profile
  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id, user.user_metadata);
    }
  };

  // Profile update
  const updateUserProfile = async (updates) => {
    if (!user?.id) return { error: 'Not authenticated' };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (!error && data) {
        setProfile(data);
      }
      return { data, error };
    } else {
      setProfile((prev) => ({ ...prev, ...updates }));
      return { data: { ...profile, ...updates }, error: null };
    }
  };

  // Computed state
  const role = profile?.role || user?.user_metadata?.role || null;
  const verificationStatus = profile?.verification_status || (role === 'organization' ? 'pending' : 'verified');
  const isVerified = verificationStatus === 'verified';
  const isPending = verificationStatus === 'pending';
  const isRejected = verificationStatus === 'rejected';

  const value = {
    user,
    session,
    profile,
    loading,
    role,
    verificationStatus,
    isVerified,
    isPending,
    isRejected,
    isAuthenticated: Boolean(user),
    authError,
    signUpDonor,
    signUpOrganization,
    signIn,
    signInAsPersona,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
