import { useSession } from "next-auth/react";
import { _id } from "@next-auth/mongodb-adapter"
import Link from "next/link";
import { OfferDto } from "../../dto/offer.dto";
import { createUrl } from "../../utils/url";
import { ChangeEvent, useEffect, useState } from "react";
import { UserDto } from "../../dto/user.dto";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export function SavedOffers() {

    const { data: session, update } = useSession()

    const [data, setData] = useState<OfferDto[]>([])
    const [profileData, setProfileData] = useState<UserDto>({} as UserDto)

    useEffect(() => {
        setProfileData(session.user)
        for(let i = 0; i < profileData.savedOffers?.length; i++) 
        {
            fetch(createUrl(`api/offers/${profileData.savedOffers[i]}`))
            .then((r) => r.json())
            .then((r) => 
            {
                if(data.length < profileData.savedOffers.length) setData(data => [r, ...data])
            })
        }
    }, [profileData])

    function handleRemoveSavedOffer(offerId: string) {
        profileData.savedOffers.splice(profileData.savedOffers.indexOf(offerId), 1)
        console.log(profileData)
        fetch(`/api/users/${profileData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData),

        }).then((res) => {res.json()})
    }

    return (
        <>
        {data.map((offer) => (
        <div className="relative flex flex-col items-center mt-4">
            <Link href={`/offers/${offer?._id}`} key={offer._id} id='offer-card' className="flex flex-col items-center w-[510px] mb-4">
                <div className="w-full max-w-lg">
                    <div className="bg-white border hover:shadow-xl transition-all rounded-lg">
                        <div className="p-4">
                            <div>
                                <div>
                                    <div className="text-2xl text-black font-bold">{offer.title}</div>
                                </div>
                                <div className="flex">
                                    <div className="text-gray-500 text-md">{offer.company}, {offer.city}</div>
                                    <div className="text-green-500 font-bold text-md">{offer.remote ? " Remote" : ''}</div>
                                </div>
                                <div key={offer._id}>
                                    <div className="text-black font-semibold bg-green-300 px-2 rounded-xl w-max text-md">nuo {offer.salary}€</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="relative flex flex-col items-center">
                <div className="bg-red-500 hover:px-2 transition-all text-white font-bold rounded-lg px-1">
                    <button onClick={() => handleRemoveSavedOffer(offer._id)}>Šalinti</button>
                </div>
            </div>
        </div>
        ))}
        </>
    )
}