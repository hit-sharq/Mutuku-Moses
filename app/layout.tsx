import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mutuku Moses - Experienced Legal Representation",
  description: "Professional legal services with experienced representation you can trust.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en" suppressHydrationWarning={true}>
  <head>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body className={inter.className}>
    <ClerkProvider>{children}</ClerkProvider>
  </body>
</html>
  )
}
