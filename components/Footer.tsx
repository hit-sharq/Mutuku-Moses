import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mutuku Moses Law Firm</h3>
            <p>Experienced Legal Representation You Can Trust</p>
            <p>Providing professional legal services with integrity and dedication.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <p>
              <Link href="/about">About</Link>
            </p>
            <p>
              <Link href="/practice-areas">Practice Areas</Link>
            </p>
            <p>
              <Link href="/team">Team</Link>
            </p>
            <p>
              <Link href="/blog">Blog</Link>
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>📧 info@mutukumoses.com</p>
            <p>📞 +254 700 123 456</p>
            <p>📍 Nairobi, Kenya</p>
          </div>

          <div className="footer-section">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Mutuku Moses Law Firm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
