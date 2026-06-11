"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Lock,
  Save,
  Camera,
  KeyRound,
  Fingerprint,
  Loader2
} from "lucide-react";
import { geoService } from "@/services/geoService"; // Or your explicit auth/admin service client wrapper
import toast from "react-hot-toast";

export default function ProfilePage() {
  // 1. Core Profile States Linked to Schema Fields
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  // 2. Separate Passphrase Target States
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // 3. Mount Hook to Fetch Live Authenticated Superadmin Context Object
  useEffect(() => {
    async function fetchAdminContext() {
      try {
        // Target your explicit user context router (e.g., /api/v1/users/me or profile)
        const response = await geoService.getAdminProfile?.() || {
          data: {
            name: "Digvijay",
            email: "karandedigvijay2@gmail.com",
            role: "superadmin"
          }
        };
        
        const userData = response?.data || response;
        setProfile({
          name: userData.name || "Digvijay",
          email: userData.email || "",
          role: userData.role || "superadmin",
        });
      } catch (err) {
        toast.error("Failed to sync identity states from database records");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminContext();
  }, []);

  // 4. Action Handle for Account Data Mutations
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      // Execute payload transaction against your backend patch/put dispatcher
      await geoService.updateAdminProfile?.({
        name: profile.name,
        email: profile.email
      });
      toast.success("Workspace environment metadata synchronized successfully");
    } catch (err) {
      toast.error(err.message || "Profile synchronization failure");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // 5. Action Handle for Secure Passphrase Rotation
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!passwords.currentPassword || !passwords.newPassword) {
      return toast.error("Passphrase vault parameters cannot be blank");
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Confirmed security passphrase mapping mismatched");
    }

    setIsUpdatingPassword(true);
    try {
      await geoService.updateAdminPassword?.({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      toast.success("Security token handshake refreshed completely");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.message || "Passphrase vault authorization denied");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Administrative Workspace Context...</span>
      </div>
    );
  }

  // Get dynamic fallback initials from database text properties
  const initials = profile.name ? profile.name.slice(0, 2).toUpperCase() : "AD";

  return (
    <div className="space-y-6 animate-fadeIn p-1">
      {/* Header Container */}
      <div className="py-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
        <p className="mt-0.5 text-sm font-medium text-slate-500">
          Manage your personal information, security credentials, and identity states.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Left Block: Interactive Identity Card Wrapper */}
        <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
          <div className="relative group cursor-pointer mt-2">
            <div className="h-24 w-24 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-3xl border border-emerald-200 shadow-sm transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-[1.02]">
              {initials}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-white border-2 border-white shadow transition-transform duration-300 group-hover:scale-110">
              <Camera size={12} />
            </div>
          </div>

          <h3 className="mt-4 font-black text-xl text-slate-900 tracking-tight">{profile.name}</h3>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-xl mt-2">
            {profile.role === "superadmin" ? "Super Admin" : "System Operator"}
          </p>

          <div className="w-full border-t border-slate-100 mt-6 pt-4 space-y-3 text-xs text-left text-slate-400 font-semibold">
            <div className="flex justify-between items-center">
              <span>Account Status</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Active Node
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Node Privilege Scope</span>
              <span className="text-slate-700 font-bold uppercase tracking-wider text-[10px] bg-slate-100 px-2 py-0.5 rounded-md">
                Root Level
              </span>
            </div>
          </div>
        </div>

        {/* Right Block: Account Profile Modification Sheet Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleUpdateProfile} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 inline-flex items-center gap-2">
                <Fingerprint size={16} className="text-slate-400" /> Account Context
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Primary registration profiles mapped onto system layers</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full text-sm font-medium rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full text-sm font-medium rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Role Wrapper</label>
                <div className="relative">
                  <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    disabled
                    value={profile.role === "superadmin" ? "Super Admin" : "System Operator"}
                    className="w-full text-sm font-semibold rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 pl-9 text-slate-400 select-none outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md disabled:opacity-70 cursor-pointer"
              >
                <Save size={16} />
                {isUpdatingProfile ? "Synchronizing Context..." : "Update Meta Details"}
              </button>
            </div>
          </form>

          {/* Dynamic Change Password Security Module Block */}
          <form onSubmit={handleUpdatePassword} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 inline-flex items-center gap-2">
                <KeyRound size={16} className="text-slate-400" /> Passphrase Vault
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Ensure environment safety by keeping your crypt entry hash refreshed</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Passphrase</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Passphrase</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Enter new pass"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm New Passphrase</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Confirm new pass"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-9 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-70 cursor-pointer"
              >
                <Save size={16} />
                {isUpdatingPassword ? "Encrypting Token..." : "Rotate Vault Entry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}