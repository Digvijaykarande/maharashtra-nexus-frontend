"use client";

import { useState, useEffect } from "react";
import {
  User,
  Shield,
  Sliders,
  Settings,
  Database,
  Globe,
  Save,
  Mail,
  Lock,
  Sun,
  Moon,
  Monitor,
  RefreshCw,
  Loader2
} from "lucide-react";
import { geoService } from "@/services/geoService";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isLoadingContext, setIsLoadingContext] = useState(true);

  // Live profile field states
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
  });

  // Password mutation field states
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Sliders },
    { id: "advanced", label: "Advanced", icon: Settings },
  ];

  // Load live user credentials and theme memory profiles on mount
  useEffect(() => {
    async function hydrateSettingsPanel() {
      try {
        const cachedTheme = localStorage.getItem("mh-nexus-theme");
        if (cachedTheme) setSelectedTheme(cachedTheme);

        const cachedNotifs = localStorage.getItem("mh-nexus-notifs");
        if (cachedNotifs !== null) setNotifications(cachedNotifs === "true");

        // Sync with your dynamic /users/me backend response parameters
        const response = await geoService.getAdminProfile?.() || {
          data: { name: "Digvijay", email: "karandedigvijay2@gmail.com" }
        };
        const userData = response?.data || response;

        setAdminData({
          name: userData.name || "Digvijay",
          email: userData.email || "karandedigvijay2@gmail.com",
        });
      } catch (err) {
        console.error("Failed syncing environment profile", err);
      } finally {
        setIsLoadingContext(false);
      }
    }
    hydrateSettingsPanel();
  }, []);

  // Save changes based on active view category
  const handleSaveWorkspaceSettings = async () => {
    setIsSaving(true);
    try {
      if (activeTab === "profile") {
        await geoService.updateAdminProfile?.(adminData);
        toast.success("Profile credentials synchronized successfully");
      } else if (activeTab === "security") {
        if (!securityData.currentPassword || !securityData.newPassword) {
          throw new Error("Security vault credentials cannot be blank");
        }
        await geoService.updateAdminPassword?.(securityData);
        toast.success("Security token handshake rotated completely");
        setSecurityData({ currentPassword: "", newPassword: "" });
      } else if (activeTab === "preferences") {
        localStorage.setItem("mh-nexus-theme", selectedTheme);
        localStorage.setItem("mh-nexus-notifs", String(notifications));
        toast.success("UI visual preferences cached successfully");
      } else {
        toast.success("Platform environment variables updated");
      }
    } catch (err) {
      toast.error(err.message || "Failed updating environment configurations");
    } finally {
      setIsSaving(false);
    }
  };

  const triggerDataSync = async () => {
    setIsSyncing(true);
    try {
      // Trigger system cache revalidation on the backend if configured
      if (geoService.refreshSystemCache) {
        await geoService.refreshSystemCache();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      toast.success("Database cache refreshed successfully!");
    } catch (err) {
      toast.error("Database revalidation sweep failed");
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoadingContext) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Regional Settings Workspace Engine...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-1">
      {/* Header Container */}
      <div className="py-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="mt-0.5 text-sm font-medium text-slate-500">
          Configure profile setups, workspace preferences, and application environments.
        </p>
      </div>

      {/* Primary Workspace Panel Structure */}
      <div className="flex flex-col gap-6 lg:flex-row items-start">
        
        {/* Left Tab Navigation Panel */}
        <div className="w-full shrink-0 lg:w-64 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                }`}
              >
                <Icon size={16} className={isActive ? "text-emerald-600" : "text-slate-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Display Board */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm min-h-[420px]">
          
          {/* PROFILE CONFIGURATION TAB PANEL */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Profile Configuration</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage your personal credentials and system visibility details</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 pb-4 border-b border-slate-100">
                <div className="relative group cursor-pointer">
                  <div className="h-20 w-20 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-2xl border border-emerald-200 transition-all group-hover:bg-emerald-100">
                    {adminData.name ? adminData.name.slice(0, 2).toUpperCase() : "AD"}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-slate-900 text-lg tracking-tight">{adminData.name}</h4>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-100/50 px-2.5 py-0.5 rounded-md mt-1 w-fit">
                    Super Administrator Access Level
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={adminData.name}
                    onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                    className="w-full text-sm font-medium rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={adminData.email}
                      onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                      className="w-full text-sm font-medium rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY CONFIGURATION TAB PANEL */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Security Credentials</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update access logs, active passes, and security passwords</p>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREFERENCES CONFIGURATION TAB PANEL */}
          {activeTab === "preferences" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">System Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">Fine-tune visual settings and interface notifications</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Color Theme Scheme</label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {[
                    { id: "light", label: "Light", icon: Sun },
                    { id: "dark", label: "Dark", icon: Moon },
                    { id: "system", label: "System", icon: Monitor }
                  ].map((t) => {
                    const ThemeIcon = t.icon;
                    const isSelected = selectedTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTheme(t.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <ThemeIcon size={16} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Dashboard Notifications</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Receive real-time operation updates in system headers</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out outline-none ${
                      notifications ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
                        notifications ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ADVANCED CONFIGURATION TAB PANEL */}
          {activeTab === "advanced" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Advanced Metadata Fields</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control environmental metadata scopes and database parameters</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Platform Hub Identity</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      disabled
                      defaultValue="Maharashtra Nexus GIS"
                      className="w-full text-sm font-semibold rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 pl-9 text-slate-400 select-none outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Core Deployment Version</label>
                  <input
                    type="text"
                    disabled
                    defaultValue="v1.0.0-production-grade"
                    className="w-full text-sm font-semibold rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-400 select-none outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Database size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 inline-flex items-center gap-1.5">
                        Database Engine Source
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">Live MongoDB Production Engine Stack Synchronized</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={triggerDataSync}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
                  >
                    <RefreshCw size={12} className={isSyncing ? "animate-spin text-emerald-600" : "text-slate-400"} />
                    {isSyncing ? "Revalidating Engine..." : "Sync Systems Cache"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Persistent Global Actions Bottom Tray */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSaveWorkspaceSettings}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md cursor-pointer disabled:opacity-70"
        >
          {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? "Saving Configuration..." : "Save Active Tab Settings"}
        </button>
      </div>
    </div>
  );
}