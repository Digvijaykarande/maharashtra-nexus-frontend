"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Landmark, Building2, MapPinned, Home,
  TreePine, Building, HeartPulse, GraduationCap, School,
  Users, FileBarChart2, BarChart3, ScrollText, Settings,
  UserCircle, LogOut, ChevronDown, Map,
} from "lucide-react";

const navGroups = [
  {
    label: null,
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  // {
  //   label: "Administrative",
  //   items: [
  //     { label: "Divisions", href: "/admin/divisions", icon: Landmark },
  //     { label: "Districts", href: "/admin/districts", icon: Building2 },
  //     { label: "Talukas", href: "/admin/talukas", icon: MapPinned },
  //     { label: "Villages", href: "/admin/villages", icon: TreePine },
  //     { label: "Cities", href: "/admin/cities", icon: Building },
  //     { label: "Towns", href: "/admin/towns", icon: Home },
  //   ],
  // },
  {
    label: "Insert Data",
    items: [
      { label: "Insert Data", href: "/admin/maharashtra", icon: HeartPulse },
    ],
  },
  {
    label: "Population",
    items: [
      { label: "Population Records", href: "/admin/population", icon: Users },
    ],
  },
  {
    label: "Reports & Analytics",
    items: [
      { label: "Reports", href: "/admin/reports", icon: FileBarChart2 },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Activity Logs", href: "/admin/logs", icon: ScrollText },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Profile", href: "/admin/profile", icon: UserCircle },
    ],
  },
];

export default function AdminSidebar({ collapsed }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState(
    navGroups.reduce((acc, g) => ({ ...acc, [g.label]: true }), {})
  );

  const toggleGroup = (label) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside style={{
      width: collapsed ? 68 : 260,
      minWidth: collapsed ? 68 : 260,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #e2e8f0",
      background: "#ffffff",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden",
    }}>

      {/* Logo */}
      <Link href="/admin">
      <div style={{
        height: 64, minHeight: 64,
        display: "flex", alignItems: "center", gap: 12,
        padding: collapsed ? "0 16px" : "0 20px",
        borderBottom: "1px solid #e2e8f0",
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 36, height: 36, minWidth: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #10b981, #059669)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
        }}>
          <Map size={18} color="#fff" />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              MH Nexus
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              Admin Panel
            </p>
          </div>
        )}
      </div>
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {navGroups.map((group) => (
          <div key={group.label ?? "top"} style={{ marginBottom: 4 }}>

            {/* Group label */}
            {group.label && !collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "6px 10px", marginBottom: 2,
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "#94a3b8",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#64748b"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
              >
                {group.label}
                <ChevronDown
                  size={12}
                  style={{
                    transition: "transform 0.2s",
                    transform: openGroups[group.label] ? "rotate(0deg)" : "rotate(-90deg)",
                  }}
                />
              </button>
            )}

            {/* Items */}
            {(collapsed || openGroups[group.label]) &&
              group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: collapsed ? "10px 0" : "9px 12px",
                      justifyContent: collapsed ? "center" : "flex-start",
                      marginBottom: 2,
                      borderRadius: 10,
                      textDecoration: "none",
                      fontSize: 16.5,
                      fontWeight: active ? 600 : 500,
                      color: active ? "#059669" : "#475569",
                      background: active ? "#f0fdf4" : "transparent",
                      transition: "background 0.15s, color 0.15s",
                      position: "relative",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.color = "#0f172a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#475569";
                      }
                    }}
                  >
                    {/* Active left bar */}
                    {active && !collapsed && (
                      <span style={{
                        position: "absolute", left: 0, top: "20%", bottom: "20%",
                        width: 3, borderRadius: 999,
                        background: "#10b981",
                      }} />
                    )}
                    <Icon
                      size={17}
                      color={active ? "#10b981" : "#94a3b8"}
                      style={{ flexShrink: 0, transition: "color 0.15s" }}
                    />
                    {!collapsed && (
                      <span style={{ flex: 1 }}>{item.label}</span>
                    )}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ borderTop: "1px solid #e2e8f0", padding: "12px 10px" }}>
        {!collapsed && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10,
            background: "#f8fafc", marginBottom: 6,
          }}>
            <div style={{
              width: 32, height: 32, minWidth: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #34d399, #059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "#fff",
              boxShadow: "0 2px 6px rgba(16,185,129,0.3)",
            }}>A</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Admin
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                admin@mhnexus.in
              </p>
            </div>
          </div>
        )}

        <button
          style={{
            display: "flex", alignItems: "center",
            gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%", padding: "9px 12px",
            borderRadius: 10, border: "none",
            background: "transparent", cursor: "pointer",
            fontSize: 16.5, fontWeight: 500, color: "#94a3b8",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#fff5f5"; e.currentTarget.style.color = "#ef4444"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={17} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}