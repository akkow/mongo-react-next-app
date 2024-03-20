"use client"
import { useSession } from "next-auth/react"
import { LoginForm } from "../../components/login/LoginForm"
import { LoadingDelay } from "../../components/utils/LoadingDelay"
import DashBoardPage from "../../components/admin-dashboard/Dashboard"
import { OfferDto } from "../../dto/offer.dto"
import { useEffect, useState } from "react"
import { createUrl } from "../../utils/url"

export default function Dashboard() {
    
    const { status } = useSession()

    if(status === 'loading') {
        <LoadingDelay />
    }
    else if(status === 'authenticated') {
        return (
            <DashBoardPage />
        ) 
    }
    else {
        return (
            <LoginForm />
        )
    }
    
}