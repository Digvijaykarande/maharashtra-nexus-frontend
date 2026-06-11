"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

import {
  ShieldCheck,
  Landmark,
  Building2,
  BarChart3,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Direct integration with the API network client
      await authService.login(form);
      toast.success("Welcome back! Session authorized.");
      
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Invalid administrative credentials.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3">
                  <ShieldCheck size={28} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Maharashtra Nexus</h1>
                  <p className="text-emerald-100">Administrative Intelligence Platform</p>
                </div>
              </div>

              <h2 className="mt-16 text-5xl font-bold leading-tight">
                Secure Access To Maharashtra Administrative Data
              </h2>

              <p className="mt-6 max-w-lg text-lg text-emerald-50">
                Monitor divisions, districts, talukas, institutions and analytics from one platform.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard icon={<Landmark size={20} />} title="6 Divisions" />
              <Building2 size={20}  title="36 Districts" />
              <FeatureCard icon={<BarChart3 size={20} />} title="Analytics" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <span className="rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                Admin Portal
              </span>

              <h2 className="mt-6 text-4xl font-bold">Welcome Back</h2>

              <p className="mt-3 text-slate-600">
                Sign in to access the administrative dashboard.
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-medium text-white transition hover:bg-emerald-600 disabled:pointer-events-none disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Verifying Token...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">Portal Access</p>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
                <p>Email: admin@nexus.gov</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function FeatureCard({ icon, title }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
      <div className="text-white">{icon}</div>
      <p className="mt-3 font-medium">{title}</p>
    </div>
  );
}