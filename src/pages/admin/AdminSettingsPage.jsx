import React, { useState } from 'react';
import { Save, Upload, Cloud, Mail, MessageSquare, Bell, Shield, Palette, Globe, Truck, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../components/ui/Toast';
import { Tabs } from '../../components/ui/Tabs';

export default function AdminSettingsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General
    siteName: 'Boreland',
    siteTagline: 'Quality Products for Modern Living',
    siteLogo: null,
    siteFavicon: null,
    contactEmail: 'contact@boreland.com',
    contactPhone: '+1-555-000-0000',
    timezone: 'UTC',
    language: 'en',
    
    // Currency
    currency: 'INR',
    currencySymbol: '₹',
    currencyPosition: 'before',
    
    // Store
    storeAddress: '123 MG Road',
    storeCity: 'Mumbai',
    storeState: 'Maharashtra',
    storeZip: '400001',
    storeCountry: 'IN',
    
    // Email (SMTP)
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@boreland.com',
    fromName: 'Boreland Store',
    
    // SMS
    smsProvider: 'twilio',
    smsApiKey: '',
    smsFromNumber: '',
    
    // Notifications
    orderNotificationEmail: 'orders@boreland.com',
    lowStockThreshold: '10',
    enableOrderEmails: true,
    enableLowStockAlerts: true,
    enableReviewNotifications: true,
    
    // SEO
    metaTitle: 'Boreland - Quality Products',
    metaDescription: 'Shop the best products at great prices',
    metaKeywords: 'ecommerce, shopping, products',
    googleAnalyticsId: '',
    facebookPixelId: '',
    
    // Security
    enableTwoFactor: false,
    sessionTimeout: '30',
    passwordMinLength: '8',
    enableCaptcha: false,
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
    enableCache: true,
    cacheTimeout: '60',
  });

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Settings saved successfully!');
    setSaving(false);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'store', label: 'Store Info', icon: Cloud },
    { id: 'email', label: 'Email (SMTP)', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'seo', label: 'SEO & Analytics', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'maintenance', label: 'Maintenance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure your store settings</p>
        </div>
        <Button onClick={handleSave} loading={saving} leftIcon={<Save />}>
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ₹{
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl">
        {/* General Settings */}
        {activeTab === 'general' && (
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic configuration for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Site Name"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                />
                <Input
                  label="Site Tagline"
                  value={settings.siteTagline}
                  onChange={(e) => handleInputChange('siteTagline', e.target.value)}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Contact Email"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
                <Input
                  label="Contact Phone"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Timezone"
                  value={settings.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'America/New_York', label: 'Eastern Time' },
                    { value: 'America/Chicago', label: 'Central Time' },
                    { value: 'America/Denver', label: 'Mountain Time' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time' },
                    { value: 'Europe/London', label: 'London' },
                    { value: 'Europe/Paris', label: 'Paris' },
                    { value: 'Asia/Tokyo', label: 'Tokyo' },
                  ]}
                />
                <Select
                  label="Language"
                  value={settings.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                    { value: 'zh', label: 'Chinese' },
                    { value: 'ja', label: 'Japanese' },
                  ]}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Select
                  label="Currency"
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  options={[
                    { value: 'INR', label: 'INR (₹)' },
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'EUR', label: 'EUR (€)' },
                    { value: 'GBP', label: 'GBP (£)' },
                    { value: 'JPY', label: 'JPY (¥)' },
                    { value: 'CAD', label: 'CAD ($)' },
                    { value: 'AUD', label: 'AUD ($)' },
                  ]}
                />
                <Input
                  label="Currency Symbol"
                  value={settings.currencySymbol}
                  onChange={(e) => handleInputChange('currencySymbol', e.target.value)}
                />
                <Select
                  label="Symbol Position"
                  value={settings.currencyPosition}
                  onChange={(e) => handleInputChange('currencyPosition', e.target.value)}
                  options={[
                    { value: 'before', label: 'Before (₹10)' },
                    { value: 'after', label: 'After (10₹)' },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Store Info */}
        {activeTab === 'store' && (
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Your store's address and location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Street Address"
                value={settings.storeAddress}
                onChange={(e) => handleInputChange('storeAddress', e.target.value)}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  label="City"
                  value={settings.storeCity}
                  onChange={(e) => handleInputChange('storeCity', e.target.value)}
                />
                <Input
                  label="State/Province"
                  value={settings.storeState}
                  onChange={(e) => handleInputChange('storeState', e.target.value)}
                />
                <Input
                  label="ZIP/Postal Code"
                  value={settings.storeZip}
                  onChange={(e) => handleInputChange('storeZip', e.target.value)}
                />
              </div>
              <Select
                label="Country"
                value={settings.storeCountry}
                onChange={(e) => handleInputChange('storeCountry', e.target.value)}
                options={[
                  { value: 'US', label: 'United States' },
                  { value: 'CA', label: 'Canada' },
                  { value: 'GB', label: 'United Kingdom' },
                  { value: 'AU', label: 'Australia' },
                  { value: 'DE', label: 'Germany' },
                  { value: 'FR', label: 'France' },
                  { value: 'JP', label: 'Japan' },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {/* Email/SMTP */}
        {activeTab === 'email' && (
          <Card>
            <CardHeader>
              <CardTitle>Email Settings (SMTP)</CardTitle>
              <CardDescription>Configure outgoing email server</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="SMTP Host"
                  value={settings.smtpHost}
                  onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                />
                <Input
                  label="SMTP Port"
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="SMTP Username"
                  value={settings.smtpUsername}
                  onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                />
                <Input
                  label="SMTP Password"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                />
              </div>
              <Select
                label="Encryption"
                value={settings.smtpEncryption}
                onChange={(e) => handleInputChange('smtpEncryption', e.target.value)}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'tls', label: 'TLS' },
                  { value: 'ssl', label: 'SSL' },
                ]}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="From Email"
                  type="email"
                  value={settings.fromEmail}
                  onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                />
                <Input
                  label="From Name"
                  value={settings.fromName}
                  onChange={(e) => handleInputChange('fromName', e.target.value)}
                />
              </div>
              <Button variant="outline">Test Email Configuration</Button>
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and alert notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Order Notification Email"
                type="email"
                value={settings.orderNotificationEmail}
                onChange={(e) => handleInputChange('orderNotificationEmail', e.target.value)}
                helperText="Email address to receive order notifications"
              />
              <Input
                label="Low Stock Threshold"
                type="number"
                value={settings.lowStockThreshold}
                onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
                helperText="Get notified when product stock falls below this level"
              />
              
              <div className="space-y-3 pt-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.enableOrderEmails}
                    onChange={(e) => handleInputChange('enableOrderEmails', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable order confirmation emails</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.enableLowStockAlerts}
                    onChange={(e) => handleInputChange('enableLowStockAlerts', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable low stock alerts</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.enableReviewNotifications}
                    onChange={(e) => handleInputChange('enableReviewNotifications', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable new review notifications</span>
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO & Analytics */}
        {activeTab === 'seo' && (
          <Card>
            <CardHeader>
              <CardTitle>SEO & Analytics</CardTitle>
              <CardDescription>Search engine optimization and tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Meta Title"
                value={settings.metaTitle}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                helperText={`₹{settings.metaTitle.length}/60 characters`}
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Meta Description
                </label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                />
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {settings.metaDescription.length}/160 characters
                </p>
              </div>
              <Input
                label="Meta Keywords"
                value={settings.metaKeywords}
                onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                helperText="Comma-separated keywords"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Google Analytics ID"
                  placeholder="UA-XXXXXXXXX-X"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                />
                <Input
                  label="Facebook Pixel ID"
                  placeholder="1234567890"
                  value={settings.facebookPixelId}
                  onChange={(e) => handleInputChange('facebookPixelId', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Protect your admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.enableTwoFactor}
                    onChange={(e) => handleInputChange('enableTwoFactor', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable Two-Factor Authentication (2FA)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.enableCaptcha}
                    onChange={(e) => handleInputChange('enableCaptcha', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable CAPTCHA on login</span>
                </label>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Session Timeout (minutes)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                />
                <Input
                  label="Minimum Password Length"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Maintenance */}
        {activeTab === 'maintenance' && (
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>Temporarily disable access to your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <span className="text-sm font-medium">Enable Maintenance Mode</span>
              </label>
              
              {settings.maintenanceMode && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Maintenance Message
                  </label>
                  <textarea
                    className="textarea"
                    rows={3}
                    value={settings.maintenanceMessage}
                    onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
                  />
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    This message will be shown to visitors during maintenance
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Cache Settings</h4>
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={settings.enableCache}
                    onChange={(e) => handleInputChange('enableCache', e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable Caching</span>
                </label>
                <Input
                  label="Cache Timeout (minutes)"
                  type="number"
                  value={settings.cacheTimeout}
                  onChange={(e) => handleInputChange('cacheTimeout', e.target.value)}
                  disabled={!settings.enableCache}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Data Management</h4>
                <div className="flex gap-2">
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Backup Database</Button>
                  <Button variant="outline">Restore Backup</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Save Button (sticky bottom) */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t py-4">
        <div className="flex justify-end">
          <Button onClick={handleSave} loading={saving} size="lg" leftIcon={<Save />}>
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
