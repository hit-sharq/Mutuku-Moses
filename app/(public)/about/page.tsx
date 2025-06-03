import Image from "next/image"
import { prisma } from "@/lib/prisma"

async function getAboutData() {
  // Get the main user profile (Mutuku Moses)
  const profile = await prisma.user.findFirst({
    where: {
      clerkId: process.env.ADMIN_USER_IDS?.split(",")[0] || "",
    },
  })

  return { profile }
}

export default async function AboutPage() {
  const { profile } = await getAboutData()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">About Mutuku Moses</h1>

        <div className="grid grid-2" style={{ alignItems: "center", marginBottom: "4rem" }}>
          <div>
            <Image
              src={profile?.image || "/placeholder.svg?height=400&width=400"}
              alt="Mutuku Moses"
              width={400}
              height={400}
              style={{ borderRadius: "10px", width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <h2 style={{ color: "#1a365d", marginBottom: "1.5rem" }}>Experienced Legal Advocate</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#666" }}>
              {profile?.bio ||
                `Mutuku Moses is a distinguished legal practitioner with over 15 years 
              of experience serving clients across Kenya. His dedication to justice and unwavering 
              commitment to client success has established him as one of the most trusted attorneys 
              in the region.`}
            </p>
            <p style={{ marginBottom: "1.5rem", color: "#666" }}>
              With a comprehensive understanding of Kenyan law and a client-first approach, Mutuku Moses has
              successfully represented individuals, families, and businesses in a wide range of legal matters.
            </p>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: "3rem" }}>
          <div className="card">
            <h3>Education & Qualifications</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "1rem", padding: "0.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
                <strong>Bachelor of Laws (LLB)</strong>
                <br />
                University of Nairobi, 2008
              </li>
              <li style={{ marginBottom: "1rem", padding: "0.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
                <strong>Diploma in Legal Practice</strong>
                <br />
                Kenya School of Law, 2009
              </li>
              <li style={{ marginBottom: "1rem", padding: "0.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
                <strong>Certified Public Secretary (CPS)</strong>
                <br />
                Kaplan Professional, 2010
              </li>
              <li style={{ padding: "0.5rem 0" }}>
                <strong>Member, Law Society of Kenya</strong>
                <br />
                Admitted to the Bar, 2009
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>Professional Experience</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "1.5rem", padding: "0.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
                <strong>Senior Partner</strong>
                <br />
                <em>Mutuku Moses & Associates (2015 - Present)</em>
                <br />
                Leading a team of legal professionals in providing comprehensive legal services.
              </li>
              <li style={{ marginBottom: "1.5rem", padding: "0.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
                <strong>Associate Lawyer</strong>
                <br />
                <em>Kamau & Partners LLP (2012 - 2015)</em>
                <br />
                Specialized in criminal defense and family law matters.
              </li>
              <li style={{ padding: "0.5rem 0" }}>
                <strong>Junior Associate</strong>
                <br />
                <em>Nairobi Legal Chambers (2009 - 2012)</em>
                <br />
                Gained foundational experience in various areas of law.
              </li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: "3rem" }}>
          <h3>Areas of Expertise</h3>
          <div className="grid grid-3" style={{ marginTop: "2rem" }}>
            <div>
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Criminal Law</h4>
              <ul style={{ color: "#666" }}>
                <li>Criminal Defense</li>
                <li>White Collar Crime</li>
                <li>Appeals</li>
                <li>Bail Applications</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Family Law</h4>
              <ul style={{ color: "#666" }}>
                <li>Divorce Proceedings</li>
                <li>Child Custody</li>
                <li>Matrimonial Property</li>
                <li>Adoption</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Corporate Law</h4>
              <ul style={{ color: "#666" }}>
                <li>Business Formation</li>
                <li>Contract Law</li>
                <li>Employment Law</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: "3rem" }}>
          <h3>Professional Memberships & Awards</h3>
          <div className="grid grid-2" style={{ marginTop: "2rem" }}>
            <div>
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Memberships</h4>
              <ul style={{ color: "#666" }}>
                <li>Law Society of Kenya</li>
                <li>Kenya Association of Criminal Lawyers</li>
                <li>International Bar Association</li>
                <li>East Africa Law Society</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Recognition</h4>
              <ul style={{ color: "#666" }}>
                <li>Outstanding Legal Practitioner Award 2022</li>
                <li>Pro Bono Service Recognition 2021</li>
                <li>Client Choice Award 2020</li>
                <li>Rising Star in Law 2018</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Ready to Work Together?</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
            Contact me today to discuss your legal needs and how I can help you achieve the best possible outcome.
          </p>
          <a href="/contact" className="cta-button">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  )
}
