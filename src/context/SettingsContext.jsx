import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    logo_url: '/logo.png',
    site_name: 'Boreland Fashions',
    loading: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          logo_url: data.logo_url || '/logo.png',
          site_name: data.site_name || 'Boreland Fashions',
          loading: false,
        });
      } else {
        setSettings((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setSettings((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateLogo = async (logoUrl) => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, logo_url: logoUrl }, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;

      setSettings((prev) => ({ ...prev, logo_url: data.logo_url }));
      return { success: true };
    } catch (error) {
      console.error('Error updating logo:', error);
      return { success: false, error: error.message };
    }
  };

  const updateSiteName = async (siteName) => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, site_name: siteName }, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;

      setSettings((prev) => ({ ...prev, site_name: data.site_name }));
      return { success: true };
    } catch (error) {
      console.error('Error updating site name:', error);
      return { success: false, error: error.message };
    }
  };

  const uploadLogo = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('site-assets')
        .getPublicUrl(fileName);

      const result = await updateLogo(urlData.publicUrl);
      return result;
    } catch (error) {
      console.error('Error uploading logo:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateLogo,
        updateSiteName,
        uploadLogo,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
