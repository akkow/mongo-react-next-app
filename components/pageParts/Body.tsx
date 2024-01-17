"use client"
import { SessionProvider } from "next-auth/react"

export function Body(props: { children: React.ReactNode}) {
    const { children } = props

    return (
        <SessionProvider>
            <body className="flex flex-col min-h-screen container-lg bg-white">{children}</body>
        </SessionProvider>
    )
}