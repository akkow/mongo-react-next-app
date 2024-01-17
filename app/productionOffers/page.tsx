"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { OfferDto } from "../../dto/offer.dto"
import { createUrl } from "../../utils/url"
import { LoginForm } from "../../components/login/LoginForm"
import { LoadingDelay } from "../../components/utils/LoadingDelay"
import { OffersListForProduction } from "../../components/offers/OffersListForProduction"

export default function OffersListForProd() {

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
            <OffersListForProduction {...{offers}}/>
        ) 
    }
    else {
        return (
            <LoginForm />
        )
    }
    
}