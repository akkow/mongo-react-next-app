import Link from "next/link"
import { OfferDto } from "../../dto/offer.dto"
import { UserDto } from "../../dto/user.dto"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { LoadingDelay } from "../utils/LoadingDelay"

type IProps = {
    offer: OfferDto
    loadUsers: () => void
    userDto?: UserDto
    setUserDto: (c: UserDto) => void
}

export function OfferSinglePage(props: IProps) {
    const { offer, loadUsers, userDto, setUserDto } = props

    const { data: session, update } = useSession()

    const [profileOfferData, setProfileOfferData] = useState<UserDto>({} as UserDto)
    const [click, setClick] = useState(true)
    const [fade, setFade] = useState(true)
    
    // useEffect(() => {
    //     let savedOffers = []
    //     if(profileOfferData?.savedOffers?.length) savedOffers = session.user.savedOffers 
    //     if(!savedOffers.includes(offer._id)) savedOffers.push(offer._id)
    //     setProfileOfferData({...session.user, savedOffers })
    // }, [session, offer])
    
    useEffect(() => {
        fetch(`/api/users/${session.user._id}`)
        .then((res) => res.json())
        .then((data) => 
        {   
            document.getElementById('offer-card-dynamic').classList.remove('hidden')
            document.getElementById('loader').classList.add('hidden')
            setProfileOfferData(data)
        })
    }, [])

    const saveOffer = () => {
        let savedOffers: any = []
        if(profileOfferData?.savedOffers?.length) savedOffers = profileOfferData.savedOffers
        if(!savedOffers.includes(offer._id)) { 
            savedOffers.push(offer._id)
            setClick(true)
            document.getElementById('text-of-alert').innerHTML = 'Išsaugotas skelbimas!'
            document.getElementById('alert-success').style.display = 'inherit'
            setTimeout(() => {
                document.getElementById('alert-success').style.display = 'none'
            }, 2000);
        } else {
            let index = savedOffers.indexOf(offer._id)
            savedOffers.splice(index, 1)
            setClick(false)
            document.getElementById('text-of-alert').innerHTML = 'Pašalintas skelbimas iš išsaugotų sąrašo!'
            document.getElementById('alert-success').style.display = 'inherit'
            setTimeout(() => {
                document.getElementById('alert-success').style.display = 'none'
            }, 2000);
        }
        profileOfferData.savedOffers = savedOffers
        fetch(`/api/users/${profileOfferData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileOfferData), 
        })
        .then((res) => {res.json()})
    }

    useEffect(() => {
        if(profileOfferData.savedOffers?.includes(offer._id)) {
            setClick(true)
        }
        else {
            setClick(false)
        }
        if(click) { 
            document.getElementById('book-mark-svg').style.fill = 'rgb(90, 255, 184)'
        }
        else {
            document.getElementById('book-mark-svg').style.fill = 'white'
        }
    })

    return (
        <>  
            <div id="loader" className="flex flex-col items-center py-80" role="status">
                <span className="loading loading-dots loading-lg w-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></span>
            </div>
            <div id='alert-success' role="alert" className={`hidden alert alert-success absolute left-[40%] top-10 w-96 transition-all duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-bold" id='text-of-alert'></span>
            </div>
            <div id="offer-card-dynamic" className="hidden">
                <div className="relative flex flex-col items-center rounded-lg shadow-xl border w-[80%] mt-10 mx-auto">
                    <div className="w-[90%] py-4">
                        <div className="flex flex-col w-[100%]">
                            <div className="text-2xl text-black justify-between flex font-bold">{offer.title}
                                <button onClick={() => saveOffer()} className="text-black hover:text-green-500" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" id='book-mark-svg' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <Link href={`companies/${offer.company}`} className="text-xl text-gray-600 font-semibold hover:text-green-500 underline">{offer.company}</Link>
                            <div className="text-xl text-gray-600 font-medium">{`, ${offer.city}`}</div>
                            <div className="flex items-end flex-col text-xl text-green-500 font-semibold">{` ${offer.remote ? 'Remote' : ''}`}</div>
                        </div>
                        <div className="border-[0.5px] border-gray mt-1"></div>
                        <div className="mt-2 text-black">
                            <p>{offer.description}</p>
                        </div>
                        <div className="border-[0.5px] border-gray mt-2"></div>
                        <div className="flex justify-between">
                            <div className="rounded-xl bg-green-500 mt-1 py-2 px-3">
                                <div className="text-white text-xl font-bold" >nuo {offer.salary} €</div>
                            </div>
                            
                            <div className="text-md font-semibold text-black">
                                <div>{offer.recruiter}</div>
                                <div className="underline">{offer.contact}</div>
                            </div>
                        </div>
                        <span className="text-xs">Neatskaičius mokeščių</span>
                    </div>
                </div>
                <Link href="/offers" className="flex flex-col items-center mt-4 underline text-md text-black rounded-xl hover:bg-green-500 hover:text-white mx-auto w-max p-2 transition-all">
                    <div className="flex gap-x-1 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        Grįžti
                    </div>
                </Link>
            </div>
        </>
    )
    
}