"use client"
import { useSession } from "next-auth/react"
import { OfferDto } from "../../dto/offer.dto"
import { LoginForm } from "../../components/login/LoginForm"
import { LoadingDelay } from "../../components/utils/LoadingDelay"
import { CreateNewOffer } from "../../components/offers/CreateNewOffer"
import { useState } from "react"

export default function Offers() {

    const [offerDto, setOfferDto] = useState<OfferDto | undefined>()

    const { status } = useSession()

    if(status === 'loading') {
        <LoadingDelay />
    }
    else if(status === 'authenticated') {
        return (
            <CreateNewOffer { ...{offerDto} }/>
        ) 
    }
    else {
        return (
            <LoginForm />
        )
    }
    
}