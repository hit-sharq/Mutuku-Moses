"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

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

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
            <span style={{ marginRight: "0.5rem" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ padding: "2rem", marginTop: "auto" }}>
        <UserButton />
      </div>
    </div>
  )
}
