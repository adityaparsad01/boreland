import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to format Supabase user object to match our app's expectation
  const formatAndSetUser = (user) => {
    setCurrentUser({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email.split('@')[0],
      role: user.user_metadata?.role || 'Customer',
    });
  };

  useEffect(() => {
    // 1. Check for active session on load
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        formatAndSetUser(session.user);
      }
      setLoading(false);
    };

    getSession();

    // 2. Listen for auth changes (sign in, sign out, password recovery, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery event if needed specifically, 
        // usually session is established automatically
      }
      
      if (session?.user) {
        formatAndSetUser(session.user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'Customer',
          },
        },
      });

      if (error) throw error;
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Logout failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send Password Reset Email
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      // redirectTo points to where the user goes after clicking the email link
      // We will point them to the profile page or a dedicated update-password page
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/account/update-password',
      });
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Password (used after clicking reset link and logging in)
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const isAuthenticated = !!currentUser;

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
