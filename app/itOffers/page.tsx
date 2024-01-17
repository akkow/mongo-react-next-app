"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { OfferDto } from "../../dto/offer.dto"
import { createUrl } from "../../utils/url"
import { LoginForm } from "../../components/login/LoginForm"
import { LoadingDelay } from "../../components/utils/LoadingDelay"
import { OffersListForIt } from "../../components/offers/OffersListForIt"

export default function OffersListForInformationTechnologies() {

    const [offers, setOffers] = useState<OfferDto[]>([])

    const { status } = useSession()

    const loadOffers = () => {
        fetch(createUrl('api/offers'), {
            cache: 'no-store',
        })
        .then((r) => r.json())
        .then((c) => setOffers(c))
    }

    useEffect(() => {
        loadOffers()
    }, [])

    if(status === 'loading') {
        <LoadingDelay />
    }
    else if(status === 'authenticated') {
        return (
            <OffersListForIt {...{offers}}/>
        ) 
    }
    else {
        return (
            <LoginForm />
        )
    }
    
}