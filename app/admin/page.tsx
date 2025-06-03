import { prisma } from "@/lib/prisma"

async function getDashboardStats() {
  const [totalPosts, publishedPosts, teamMembers, galleryImages, contactRequests, unreadRequests] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.teamMember.count(),
    prisma.galleryImage.count(),
    prisma.contactRequest.count(),
    prisma.contactRequest.count({ where: { read: false } }),
  ])

  return {
    totalPosts,
    publishedPosts,
    teamMembers,
    galleryImages,
    contactRequests,
    unreadRequests,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
      </div>

      <div className="grid grid-3" style={{ marginBottom: "3rem" }}>
        <div className="card">
          <h3>Blog Posts</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a365d" }}>
            {stats.publishedPosts}/{stats.totalPosts}
          </p>
          <p style={{ color: "#666" }}>Published/Total</p>
        </div>

        <div className="card">
          <h3>Team Members</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a365d" }}>{stats.teamMembers}</p>
          <p style={{ color: "#666" }}>Active members</p>
        </div>

        <div className="card">
          <h3>Gallery Images</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a365d" }}>{stats.galleryImages}</p>
          <p style={{ color: "#666" }}>Total images</p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Contact Requests</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#e53e3e" }}>{stats.unreadRequests}</p>
          <p style={{ color: "#666", marginBottom: "1rem" }}>Unread out of {stats.contactRequests} total</p>
          <a href="/admin/contact-requests" className="btn btn-primary">
            View Requests
          </a>
        </div>

        <div className="card">
          <h3>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a href="/admin/blog/new" className="btn btn-primary">
              Create New Blog Post
            </a>
            <a href="/admin/team/new" className="btn btn-secondary">
              Add Team Member
            </a>
            <a href="/admin/gallery/new" className="btn btn-secondary">
              Upload Gallery Image
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
