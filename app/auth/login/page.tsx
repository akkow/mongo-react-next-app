"use client"
import { useSession } from "next-auth/react"
import { LoginForm } from "../../../components/login/LoginForm"
import { redirect } from "next/navigation"

export default function LoginPage() {
    const { status } = useSession()
        if(status === "authenticated") 
        {
            return redirect('/')

        }
        if(status === "unauthenticated") 
        {
            return (
                <LoginForm />
            )
        }
}