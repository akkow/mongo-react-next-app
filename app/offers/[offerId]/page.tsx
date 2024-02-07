'use client'
import { createUrl } from "../../../utils/url"
import { OfferSinglePage } from "../../../components/offers/OfferSinglePage"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { LoadingDelay } from "../../../components/utils/LoadingDelay"
import { LoginForm } from "../../../components/login/LoginForm"
import { OfferDto } from "../../../dto/offer.dto"
import { useEffect, useState } from "react"
import { UserDto } from "../../../dto/user.dto"

type Params = {
    params: {
        offerId: string
    }
}

export default function OfferPage( {params: {offerId} }: Params) {
    const [offer, setOffer] = useState<OfferDto>({} as OfferDto)
    const [userDto, setUserDto] = useState<UserDto | undefined>()

    const loadOffer = () => {
        fetch(createUrl(`api/offers/${offerId}`), {
            cache: 'no-store',
        })
        .then((r) => r.json())
        .then((c) => setOffer(c))
    }

    const loadUsers = () => {
        fetch(createUrl(`api/users`), {
            cache: "no-store"
        })
        .then((r) => r.json())
        .then((c) => setUserDto(c))
    }
 
    useEffect(() => {
        loadOffer()
        loadUsers()
    }, [])

    const { status } = useSession()
    
    if(status === 'loading') {
        return (
            <LoadingDelay />
        )
    }
    else if(status === 'authenticated') {
        return (
            <OfferSinglePage {...{ offer, userDto, setUserDto, loadUsers }}/>
        )
    }
    else if(status === 'unauthenticated') {
        return (
            <LoginForm />
        )
    }
}