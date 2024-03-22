"use client"
import { useSession } from "next-auth/react"
import { OfferList } from "../../components/offers/OfferList"
import { useEffect, useState } from "react"
import { OfferDto } from "../../dto/offer.dto"
import { createUrl } from "../../utils/url"
import { LoginForm } from "../../components/login/LoginForm"
import { LoadingDelay } from "../../components/utils/LoadingDelay"

export default function Offers() {

    const [offers, setOffers] = useState<OfferDto[]>([])

    const { status } = useSession()

    const loadOffers = () => {
        fetch(createUrl('api/offers'), {
            cache: 'no-store',
        })
        .then((r) => r.json())
        .then((c) => {
            setOffers(c);
            document.getElementById('loader').style.display = 'none'
            document.getElementById('offers-list').classList.remove('hidden');
        })
    }

    useEffect(() => {
        loadOffers()
    }, [])

    if(status === 'loading') {
        <LoadingDelay />
    }
    else if(status === 'authenticated') {
        return (
            <>
                <div id="loader" className="flex flex-col items-center py-80" role="status">
                    <span className="loading loading-dots loading-lg w-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></span>
                </div>
                <OfferList {...{offers}}/>
            </>
        ) 
    }
    else {
        return (
            <LoginForm />
        )
    }
    
}