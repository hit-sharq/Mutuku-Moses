import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"

async function getHomeData() {
  const [practiceAreas, teamMembers, recentPosts] = await Promise.all([
    prisma.practiceArea.findMany({
      take: 3,
      orderBy: { order: "asc" },
    }),
    prisma.teamMember.findMany({
      take: 3,
      orderBy: { order: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
  ])

  return { practiceAreas, teamMembers, recentPosts }
}

export default async function HomePage() {
  const { practiceAreas, teamMembers, recentPosts } = await getHomeData()

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: "3rem" }}>
            <div>
              <h1>Mutuku Moses</h1>
              <p>Experienced Legal Representation You Can Trust</p>
              <Link href="/contact" className="cta-button">
                Schedule Consultation
              </Link>
            </div>
            <div style={{ textAlign: "center" }}>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Mutuku Moses"
                width={400}
                height={400}
                style={{ borderRadius: "10px", maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "2rem" }}>
                About Mutuku Moses
              </h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#666" }}>
                With over 15 years of experience in legal practice, Mutuku Moses has established himself as a trusted
                advocate for clients across various legal matters. His commitment to excellence and client-focused
                approach has earned him recognition in the legal community.
              </p>
              <p style={{ marginBottom: "2rem", color: "#666" }}>
                Specializing in criminal law, family law, and corporate legal matters, Mutuku Moses brings a wealth of
                knowledge and a proven track record of success to every case.
              </p>
              <Link href="/about" className="btn btn-primary">
                Learn More About Me
              </Link>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Mutuku Moses in office"
                width={400}
                height={300}
                style={{ borderRadius: "10px", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="section" style={{ background: "#f7fafc" }}>
        <div className="container">
          <h2 className="section-title">Practice Areas</h2>
          <p className="section-subtitle">Comprehensive legal services tailored to meet your specific needs</p>

          <div className="grid grid-3">
            {practiceAreas.map((area) => (
              <div key={area.id} className="card">
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{area.icon || "⚖️"}</div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/practice-areas" className="btn btn-primary">
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the dedicated professionals committed to your legal success</p>

          <div className="grid grid-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="card team-card">
                <Image
                  src={member.image || "/placeholder.svg?height=150&width=150"}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="team-image"
                />
                <h3>{member.name}</h3>
                <p style={{ color: "#1a365d", fontWeight: "600", marginBottom: "0.5rem" }}>{member.title}</p>
                <p>{member.bio.substring(0, 100)}...</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/team" className="btn btn-primary">
              Meet Our Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="section" style={{ background: "#f7fafc" }}>
        <div className="container">
          <h2 className="section-title">Latest Insights</h2>
          <p className="section-subtitle">Stay informed with our latest legal insights and updates</p>

          <div className="grid grid-3">
            {recentPosts.map((post) => (
              <div key={post.id} className="card blog-card">
                <Image
                  src={post.image || "/placeholder.svg?height=200&width=300"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="blog-image"
                />
                <div className="blog-meta">{new Date(post.createdAt).toLocaleDateString()}</div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <Link href={`/blog/${post.slug}`} className="btn btn-secondary" style={{ marginTop: "1rem" }}>
                  Read More
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/blog" className="btn btn-primary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
              color: "white",
              padding: "4rem 2rem",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Ready to Get Started?</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: "0.9" }}>
              Contact us today for a consultation and let us help you with your legal needs.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="cta-button">
                Schedule Consultation
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
