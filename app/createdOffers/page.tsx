"use client"
import { useSession } from "next-auth/react"
import { LoginForm } from "../../components/login/LoginForm"
import { useEffect, useState } from "react"
import { LoadingDelay } from "../../components/utils/LoadingDelay"
import { SavedOffers }  from "../../components/savedOffers/SavedOffers"
import { OfferDto } from "../../dto/offer.dto"
import { createUrl } from "../../utils/url"
import { CreatedOffersList } from "../../components/created-offers-listings/CreatedOffersList"

export default function CreatedOffersPage() {
    const [offers, setOffers] = useState<OfferDto[]>([])

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

    const { status } = useSession()
        if(status === "authenticated") 
        {
            return (
                <CreatedOffersList />
            )

        }
        if(status === "loading") {
            return (
                <LoadingDelay />
            )
        }
        if(status === "unauthenticated") 
        {
            return (
                <LoginForm />
            )
        }
}