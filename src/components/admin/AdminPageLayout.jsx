"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminPageLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    body.style.overflow = "hidden";
    body.style.height = "100vh";
    html.style.height = "100vh";

    // Remove dark class completely
    document.documentElement.classList.remove("dark");

    return () => {
      body.style.overflow = "";
      body.style.height = "";
      html.style.height = "";
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
      }}
      className="bg-slate-50"
    >
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AdminNavbar
          onToggleSidebar={() =>
            setCollapsed(!collapsed)
          }
        />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
          }}
          className="px-6 py-6 bg-slate-50"
        >
          {children}
        </main>
      </div>
    </div>
  );
}