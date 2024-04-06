import { useSession } from "next-auth/react";
import { _id } from "@next-auth/mongodb-adapter/dist"
import Link from "next/link";
import { OfferDto } from "../../dto/offer.dto";
import { useEffect, useState } from "react";
import { UserDto } from "../../dto/user.dto";

export function CreatedOffersList() {

    const { data: session } = useSession()

    const [data, setData] = useState<OfferDto[]>([])

    useEffect(() => {
        fetch(`/api/offers`)
        .then((r) => r.json())
        .then((res) => {
            setData(res.filter((offer: OfferDto) => offer.created_by == session.user._id))
            document.getElementById('loader').classList.add('hidden');
            if(data.length != 0) {
                document.getElementById('notification').classList.remove('hidden');
            }
        })
    }, [])

    return (
        <>
        <div id="loader" className="flex flex-col items-center py-80" role="status">
            <span className="loading loading-dots loading-lg w-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></span>
        </div>
        <div id="notification" className="hidden flex flex-col items-center mt-2 mb-10"><h1 className="font-bold text-2xl text-black mt-2 mb-6">Nėra sukurtų skelbimų</h1></div>
        {data.map((offer) => (
        <div id="saved-offer-card" className="relative flex flex-col items-center mt-4">
            <Link href={`/offers/${offer?._id}`} key={offer._id} id='offer-card' className="flex flex-col items-center w-[510px] mb-4">
                <div className="w-full max-w-lg">
                    <div className="bg-white border hover:shadow-xl transition-all rounded-lg">
                        <div className="p-4">
                            <div>
                                <div>
                                    <div className="text-2xl text-black font-bold">{offer?.title}</div>
                                </div>
                                <div className="flex">
                                    <div className="text-gray-500 text-md">{offer?.company}, {offer?.city}</div>
                                    <div className="text-green-500 font-bold text-md">{offer?.remote ? " Remote" : ''}</div>
                                </div>
                                <div key={offer?._id}>
                                    <div className="text-black font-semibold bg-green-300 px-2 rounded-xl w-max text-md">nuo {offer?.salary}€</div>
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