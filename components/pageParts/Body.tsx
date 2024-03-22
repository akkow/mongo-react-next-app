"use client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

export function Body(props: { children: React.ReactNode, session: Session}) {
    const { children, session } = props

    return (
        <SessionProvider session={session}>
            <body className="flex flex-col min-h-screen container-lg bg-white">{children}</body>
        </SessionProvider>
    )
}