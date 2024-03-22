import { useSession } from "next-auth/react"
import { Body } from "../components/pageParts/Body"
import { Footer } from "../components/pageParts/Footer"
import { Header } from "../components/pageParts/Header"
import "../styles/globals.css"
import { getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"

export const metadata = {
  title: "CV Portalas",
  description: "CV Portalas",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <Body {...{session}}>
        <Header />
        {children}
        <Footer />
      </Body>
    </html>
  )
}