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
            <p>📧 officialmutuku@gmail.com</p>
            <p>📞 +254 758 251 399</p>
            <p>📍 Nairobi, Kenya</p>
          </div>

          <div className="footer-section">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <div className="footer-section">
            <h3>Follow Me</h3>
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1">

                <p>
                  <a href="https://facebook.com/mutukumoses" target="_blank" rel="noopener noreferrer">🄼 Facebook</a>
                </p>
                <p>
                  <a href="https://twitter.com/mutukumoses" target="_blank" rel="noopener noreferrer">🅄 Twitter</a>
                </p>
                <p>
                  <a href="https://linkedin.com/in/mutukumoses" target="_blank" rel="noopener noreferrer">🅂 LinkedIn</a>
                </p>
                <p>
                  <a href="https://instagram.com/mutukumoses" target="_blank" rel="noopener noreferrer">🄰 Instagram</a>
                </p>
              </div>
              <img src="/Musa.jpg" alt="Musa" className="w-20 h-20 object-cover rounded-full shadow-lg border-2 border-gray-300" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          
          <p>&copy; 2025 Mutuku Moses. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
