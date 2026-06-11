"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Search, Sun, Moon, ChevronDown, X } from "lucide-react";
import { authService } from "@/services/authService";

const notifications = [
  { id: 1, text: "New district record added", time: "2m ago", unread: true },
  { id: 2, text: "Population report generated", time: "1h ago", unread: true },
  { id: 3, text: "Hospital data updated", time: "3h ago", unread: false },
];

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function AdminNavbar({ onToggleSidebar, darkMode, onToggleDark }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] =  useState("");
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useOutsideClick(notifRef, () => setShowNotif(false));
  useOutsideClick(userRef, () => setShowUser(false));

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header
      style={{
        height: 64,
        minHeight: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #e2e8f0",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* ── Left ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#64748b",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
        >
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: 40,
            padding: "0 16px",
            borderRadius: 12,
            border: searchFocused ? "1.5px solid #10b981" : "1.5px solid #e2e8f0",
            background: searchFocused ? "#ffffff" : "#f8fafc",
            boxShadow: searchFocused ? "0 0 0 3px rgba(16,185,129,0.1)" : "none",
            transition: "all 0.2s ease",
            minWidth: 280,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search size={15} color={searchFocused ? "#10b981" : "#94a3b8"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
          <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              type="text"
              placeholder="Search divisions, districts, villages..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13.5,
                color: "#334155",
                fontFamily: "inherit",
              }}
            />
            
        </div>
        {searchQuery && (
            <div
              style={{
                position: "absolute",
                top: "70px",
                left: "60px",
                width: "400px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                zIndex: 100,
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  fontWeight: 600,
                }}
              >
                Search Results
              </div>

              <div style={{ padding: "12px 16px" }}>
                Pune Division
              </div>

              <div style={{ padding: "12px 16px" }}>
                Pune District
              </div>

              <div style={{ padding: "12px 16px" }}>
                Haveli Taluka
              </div>
            </div>
          )}
      </div>

      {/* ── Right ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

        {/* Dark mode */}
        {/* <button
          onClick={onToggleDark}
          title={darkMode ? "Light mode" : "Dark mode"}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: 10,
            border: "none", background: "transparent", cursor: "pointer",
            color: "#64748b", transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button> */}

        {/* Notifications */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setShowNotif((p) => !p); setShowUser(false); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, borderRadius: 10, position: "relative",
              border: "none", background: showNotif ? "#f0fdf4" : "transparent",
              cursor: "pointer", color: showNotif ? "#10b981" : "#64748b",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { if (!showNotif) { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}}
            onMouseLeave={(e) => { if (!showNotif) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}}
          >
            <Bell size={18} />
            {unread > 0 && (
              <span style={{
                position: "absolute", top: 5, right: 5,
                width: 8, height: 8, borderRadius: "50%",
                background: "#10b981", border: "2px solid #fff",
              }} />
            )}
          </button>

          {/* Notif dropdown */}
          <div style={{
            position: "absolute", right: 0, top: "calc(100% + 8px)",
            width: 320, borderRadius: 16,
            border: "1px solid #e2e8f0", background: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            transformOrigin: "top right",
            transform: showNotif ? "scale(1)" : "scale(0.95)",
            opacity: showNotif ? 1 : 0,
            pointerEvents: showNotif ? "all" : "none",
            transition: "transform 0.15s ease, opacity 0.15s ease",
            zIndex: 50,
          }}>
            <div style={{ padding: "14px 18px 12px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>Notifications</span>
              {unread > 0 && (
                <span style={{ background: "#ecfdf5", color: "#059669", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>
                  {unread} new
                </span>
              )}
            </div>
            {notifications.map((n) => (
              <div key={n.id} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 18px",
                borderBottom: "1px solid #f8fafc",
                background: n.unread ? "#f0fdf4" : "transparent",
                transition: "background 0.15s",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = n.unread ? "#dcfce7" : "#f8fafc"}
                onMouseLeave={(e) => e.currentTarget.style.background = n.unread ? "#f0fdf4" : "transparent"}
              >
                <div style={{
                  marginTop: 4, width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                  background: n.unread ? "#10b981" : "#cbd5e1",
                }} />
                <div>
                  <p style={{ fontSize: 13, color: "#334155", margin: 0 }}>{n.text}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{n.time}</p>
                </div>
              </div>
            ))}
            <div style={{ padding: "10px 18px" }}>
              <a href="/admin/logs" style={{ fontSize: 12, fontWeight: 600, color: "#10b981", textDecoration: "none" }}>
                View all activity →
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "#e2e8f0", margin: "0 8px" }} />

        {/* User */}
        <div ref={userRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setShowUser((p) => !p); setShowNotif(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "6px 10px 6px 6px", borderRadius: 12,
              border: "none", background: showUser ? "#f0fdf4" : "transparent",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { if (!showUser) e.currentTarget.style.background = "#f8fafc"; }}
            onMouseLeave={(e) => { if (!showUser) e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #34d399, #059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#fff",
              boxShadow: "0 2px 8px rgba(16,185,129,0.35)",
              flexShrink: 0,
            }}>A</div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>Admin</p>
              <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", lineHeight: 1.3 }}>Super Admin</p>
            </div>
            <ChevronDown
              size={14}
              color="#94a3b8"
              style={{ transition: "transform 0.2s", transform: showUser ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {/* User dropdown */}
          <div style={{
            position: "absolute", right: 0, top: "calc(100% + 8px)",
            width: 200, borderRadius: 16,
            border: "1px solid #e2e8f0", background: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            transformOrigin: "top right",
            transform: showUser ? "scale(1)" : "scale(0.95)",
            opacity: showUser ? 1 : 0,
            pointerEvents: showUser ? "all" : "none",
            transition: "transform 0.15s ease, opacity 0.15s ease",
            zIndex: 50,
            overflow: "hidden",
          }}>
            <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#0f172a" }}>Admin User</p>
              <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", marginTop: 2 }}>admin@mhnexus.in</p>
            </div>
            {[{ label: "Profile", href: "/admin/profile" }, { label: "Settings", href: "/admin/settings" }].map((item) => (
              <a key={item.label} href={item.href} style={{
                display: "block", padding: "10px 16px", fontSize: 13, color: "#334155",
                textDecoration: "none", borderBottom: "1px solid #f8fafc",
                transition: "background 0.12s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >{item.label}</a>
            ))}
            <button style={{
              display: "block", width: "100%", padding: "10px 16px",
              fontSize: 13, fontWeight: 500, color: "#ef4444",
              background: "transparent", border: "none", textAlign: "left",
              cursor: "pointer", transition: "background 0.12s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#fff5f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              onClick={() => authService.logout()}
            >Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}