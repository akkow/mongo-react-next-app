"use client"
import { useSession } from "next-auth/react";
import { LoginForm } from "../components/login/LoginForm";
import { redirect } from "next/navigation";

export default function Page() {

    const { status } = useSession()

    if(status==='authenticated') 
    {
        redirect('/offers')
    }
    else 
    {
        return (
        <LoginForm />
        )
    }
}