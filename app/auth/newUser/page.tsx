'use client'
import { useSession } from "next-auth/react"
import { Welcome } from "../../../components/newUser/Welcome"
import { redirect } from "next/navigation"

export default function NewUser() {
    const { status } = useSession()
        if(status === "unauthenticated") 
        {
            redirect('login')

        }
        if(status === "authenticated") 
        {
            return (
                <Welcome />
            )
        }
}