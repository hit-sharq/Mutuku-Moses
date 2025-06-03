"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false))
    }
  }, [isSignedIn])

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            Mutuku Moses
          </Link>

          <ul className={`nav-links ${isMenuOpen ? "mobile-open" : ""}`}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/practice-areas">Practice Areas</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin" className="admin-link">
                  Admin Panel
                </Link>
              </li>
            )}
            {isSignedIn ? (
              <li>
                <UserButton />
              </li>
            ) : (
              <li>
                <SignInButton mode="modal" />
              </li>
            )}
          </ul>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </nav>
      </div>
    </header>
  )
}
