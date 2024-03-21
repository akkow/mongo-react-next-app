import { useSession } from "next-auth/react";
import { _id } from "@next-auth/mongodb-adapter/dist"
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
        fetch(`/api/users/${session.user._id}`).then((res) => res.json()).then((datae) => setProfileData(datae))
        if(profileData.savedOffers?.length == 0) {
            document.getElementById('loader').classList.add('hidden');
            document.getElementById('notification').classList.remove('hidden');
        }
        for(let i = 0; i < profileData.savedOffers?.length; i++) 
        {
            fetch(createUrl(`api/offers/${profileData.savedOffers[i]}`))
            .then((r) => r.json())
            .then((k) => 
            {   
                document.getElementById('loader').classList.add('hidden');
                if(data.length < profileData.savedOffers.length) setData(data => [k, ...data])
            })
        }
    }, [profileData._id])
    return (
        <>
        <div id="loader" className="flex flex-col items-center py-80" role="status">
            <span className="loading loading-dots loading-lg w-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></span>
        </div>
        <div id="notification" className="hidden flex flex-col items-center mt-2 mb-10"><h1 className="font-bold text-2xl text-black mt-2 mb-6">Nėra įsimintų skelbimų</h1></div>
        {data.map((offer) => (
        <div id="saved-offer-card" className="relative flex flex-col items-center mt-4">
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
        </div>
        ))}
        </>
    )
}