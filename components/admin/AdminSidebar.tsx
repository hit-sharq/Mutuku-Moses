"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { useState } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/blog", label: "Blog Manager", icon: "📝" },
  { href: "/admin/team", label: "Team Manager", icon: "👥" },
  { href: "/admin/gallery", label: "Gallery Manager", icon: "🖼️" },
  { href: "/admin/practice-areas", label: "Practice Areas", icon: "⚖️" },
  { href: "/admin/contact-requests", label: "Contact Requests", icon: "📧" },
  { href: "/admin/profile", label: "Profile Settings", icon: "⚙️" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-admin-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        ☰
      </button>

      <div className={`admin-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ margin: 0, borderBottom: "none", paddingBottom: 0 }}>Admin Panel</h2>
          <button
            className="mobile-admin-toggle"
            onClick={() => setIsMobileOpen(false)}
            style={{ position: "relative", top: "auto", left: "auto" }}
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setIsMobileOpen(false)}
            >
              <span style={{ marginRight: "0.75rem", fontSize: "1.2rem" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "2rem", marginTop: "auto", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <UserButton />
            <span style={{ fontSize: "0.9rem", color: "#666" }}>Admin User</span>
          </div>
          <Link
            href="/"
            className="back-to-website"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            🌐 Back to Website
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "block",
          }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
