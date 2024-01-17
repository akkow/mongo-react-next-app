import { OfferDto } from "../../dto/offer.dto";
import Link from "next/link";

type IProps = {
    offers: OfferDto[]
}

export function OffersListForIt(props: IProps) {

    const { offers } = props
    const itoffers = []
    
    for(let i = 0; i < offers.length; i++) {
        if(offers[i].category === 'Informacinės technologijos'){
            itoffers.push(offers[i]);
        }
    }

    return (
    <>
        <div className="flex flex-col items-center mt-2 mb-10">
            <h1 className="font-bold text-2xl text-black mt-2 mb-4">Informacinių technologijų srities skelbimai</h1>
            <Link href={`/createNewOffer`} className="bg-green-500 my-4 rounded-xl p-2 text-white text-md font-bold hover:shadow-xl hover:bg-green-600 transition-all">
                Sukurti naują
            </Link>
        {itoffers.map((offer) => (
            <Link href={`/offers/${offer._id}`} key={offer._id} id='offer-card' className="flex flex-col items-center w-[100%] mb-4">
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
        ))}
        </div>
    </>
    )
}