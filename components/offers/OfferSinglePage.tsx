import Link from "next/link"
import { OfferDto } from "../../dto/offer.dto"
import { UserDto } from "../../dto/user.dto"
import { useSession } from "next-auth/react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { LoadingDelay } from "../utils/LoadingDelay"
import toast, { Toaster } from "react-hot-toast"
import { Textarea } from "@material-tailwind/react"
import e from "express"
import { redirect } from "next/navigation"

type IProps = {
    offer?: OfferDto
    loadUsers: () => void
    userDto?: UserDto
    setUserDto: (c: UserDto) => void
    loadOffer: () => void
}

export function OfferSinglePage(props: IProps) {

    const { offer, loadOffer } = props

    const { data: session } = useSession()
    
    const [profileOfferData, setProfileOfferData] = useState<UserDto>({} as UserDto)
    const [offerData, setOfferData] = useState<OfferDto>({} as OfferDto)
    const [click, setClick] = useState(false)
    const [applicatons, setApplications] = useState([])
    
    const handleField = (e: ChangeEvent<any>) => {
        if(e.target.name == 'remote') {
            offerData.remote = e.target.checked
        } else {
            setOfferData({ ...offerData, [e.target.id]: e.target.value })
        }
    } 

    useEffect(() => {
        fetch(`/api/offers/${offer._id}`).then((res) => res.json()).then((data) => setOfferData(data));
        fetch(`/api/users/${session.user._id}`)
        .then((res) => res.json())
        .then((data) => 
        {   
            if(data.savedOffers.includes(offer._id)) {
                setClick(true)
            }
            document.getElementById('offer-card-dynamic').classList.remove('hidden')
            document.getElementById('loader').classList.add('hidden')
            setProfileOfferData(data)
        })

        offer.applicants?.forEach((user_id) => {
            fetch(`/api/users/${user_id}`).then((r) => r.json()).then((data) => {
            if(!JSON.stringify(applicatons).includes(data._id)) {
                applicatons.push(data)
            }
        })})
    }, [])

    const saveOffer = () => {
        let savedOffers: any = []
        if(profileOfferData?.savedOffers?.length) savedOffers = profileOfferData.savedOffers
        if(!savedOffers.includes(offer._id)) { 
            savedOffers.push(offer._id)
            setClick(true)
            toast.success('Skelbimas sėkmingai įsimintas.')
        } else {
            let index = savedOffers.indexOf(offer._id)
            savedOffers.splice(index, 1)
            setClick(false)
            toast.success('Skelbimas pašalintas iš įsimintų sąrašo.')
        }
        profileOfferData.savedOffers = savedOffers
        fetch(`/api/users/${profileOfferData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileOfferData), 
        })
        .then((res) => {res.json()})
    }

    const deleteOffer = () => {
        fetch(`/api/offers/${offer._id}`).then(r => r.json()).then((data: OfferDto) => {
            if(data?.created_by == session.user._id) {
                fetch(`/api/offers/${data._id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                }).then(r => {
                    if(r.status == 200) {
                        toast.success('Sėkmingai ištrintas skelbimas: ' + data._id)
                    }
                })
            }
            else {
                toast.error('Serverio klaida.')
            }
        })
    }

    const editOffer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`/api/offers/${offer._id}`).then(r => r.json()).then((data: OfferDto) => {
            if(data?.created_by == session.user._id) {
                fetch(`/api/offers/${data._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(offerData)
                }).then((r) => r.json()).then((response) => {
                    toast.success('Sėkmingai pakeista.')
                })
            }
            else {
                toast.error('Serverio klaida.')
            }
        })
    }

    const sendApplication = () => {
        if(!offerData.applicants.includes(session.user._id)) {
            offerData.applicants.push(session.user._id);
        }
        fetch(`/api/offers/${offer._id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(offerData)
        }).then((r) => {
            if(r.status == 200) {
                toast.success('Sėkmingai aplikavote!')
            } else {
                toast.error('Klaida!');
            }
        })
        if(!profileOfferData.appliedOffers.includes(offer._id)) {
            profileOfferData.appliedOffers.push(offer._id);
        }
        fetch(`/api/users/${profileOfferData._id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileOfferData)
        })
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
    }, [click])

    return (
        <>  
            <Toaster />
            <div id="loader" className="flex flex-col items-center py-80" role="status">
                <span className="loading loading-dots loading-lg bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></span>
            </div>
            <div id="offer-card-dynamic" className="hidden">
                <div className="relative flex flex-col items-center rounded-lg shadow-xl border w-[80%] mt-10 mx-auto">
                    <div className="w-[90%] py-4">
                        <div className="flex flex-col w-[100%]">
                            <div className="text-2xl text-black justify-between flex font-bold">{offerData.title}
                                <button onClick={() => saveOffer()} className="text-black hover:text-green-500" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" id='book-mark-svg' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <Link href='#' className="text-xl text-gray-600 font-semibold hover:text-green-500 underline">{offerData.company}</Link>
                            <div className="text-xl text-gray-600 font-medium">{`, ${offerData.city}`}</div>
                            <div className="flex items-end flex-col text-xl text-green-500 font-semibold">{` ${offerData.remote ? 'Remote' : ''}`}</div>
                        </div>
                        <div className="border-[0.5px] border-gray mt-1"></div>
                        <div className="mt-2 text-black">
                            <p>{offerData.description}</p>
                        </div>
                        <div className="border-[0.5px] border-gray mt-2"></div>
                        <div className="flex justify-between">
                            <div className="rounded-xl bg-green-500 mt-1 py-2 px-3">
                                <div className="text-white text-xl font-bold" >nuo {offerData.salary} €</div>
                            </div>
                            {offerData.created_by == session.user._id && <button data-tip="Ištrinti" onClick={() => deleteOffer()} className="tooltip tooltip-right text-black hover:text-red-500" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button> }
                            {offerData.created_by == session.user._id && <button data-tip="Redaguoti" onClick={()=> (document.getElementById('my_modal_5') as any).showModal()} className="tooltip tooltip-right text-black hover:text-green-500" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button> }
                            <div className="text-md font-semibold text-black">
                                <div>{offerData.recruiter}</div>
                                <div className="underline">{offerData.contact}</div>
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
            {offerData.created_by != session.user._id && !profileOfferData.appliedOffers?.includes(offerData._id) &&
            <div className="self-center">
                <button onClick={() => sendApplication()} className="bg-black text-white btn btn-lg px-10 mt-20 hover:bg-green-500 border-hidden hover:shadow-xl" type="button">
                    Aplikuoti
                </button> 
            </div>}
            {offerData.created_by == session.user._id &&
            <>
            <div className="overflow-x-auto mt-10 p-4">
            <h1 className="text-center mb-1 font-bold text-black text-xl uppercase">Aplikantai</h1>
                <table className="table border-2 border-green-600">
                    <thead>
                        <tr className='text-xl text-center text-black border-2 border-green-600'>
                            <th>#</th>
                            <th>Vardas</th>
                            <th>Pavardė</th>
                            <th>Tel. nr.</th>
                            <th>El. paštas</th>
                            <th>Linked In</th>
                            <th>Dabartinė pozicija</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {applicatons?.map((application, index) => (
                        <tr className='text-center text-xl text-black font-bold hover:bg-indigo-100 transition-all'>
                            <th className='border border-green-600 '>{index+1}</th> 
                            <td className='border border-green-600 '>{application.name}</td>
                            <td className='border border-green-600 '>{application.surname}</td>
                            <td className='border border-green-600 '>{application.phoneNumber}</td>
                            <td className='border border-green-600 '>{application.email}</td>
                            <td className='border border-green-600 '>{application.linkedIn}</td>
                            <td className='border border-green-600 '>{application.position}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center text-zinc-300">REDAGUOTI SKELBIMĄ</h3>
                <form onSubmit={editOffer}>
                    <div className="py-4 flex flex-col text-center textarea-md text-zinc-300 text-lg">
                        <label className="font-bold">Pozicija</label>
                        <input id="title" className="input input-bordered input-sm w-full" type="text" value={offerData.title} onChange={handleField}/>
                        <label className="mt-2 font-bold">Įmonė</label>
                        <input id="company" className="input input-bordered input-sm w-full" value={offerData.company} onChange={handleField}/>
                        <label className="mt-2 font-bold">Atsakingas asmuo</label>
                        <input id="recruiter" className="input input-bordered input-sm w-full" value={offerData.recruiter} onChange={handleField}/>
                        <label className="mt-2 font-bold">Kontaktai</label>
                        <input id="contact" className="input input-bordered input-sm w-full" value={offerData.contact} onChange={handleField}/>
                        <label className="mt-2 font-bold">Atlyginimas</label>
                        <input id="salary" className="input input-bordered input-sm w-full" value={offerData.salary} onChange={handleField}/>
                        <label className="mt-2 font-bold">Miestas</label>
                        <input id="city" className="input input-bordered input-sm w-full" value={offerData.city} onChange={handleField}/>
                        <label className="mt-2 font-bold">Aprašymas</label>
                        <textarea id="description" className="input input-bordered" value={offerData.description} onChange={handleField}/>
                        <label className="mt-2 font-bold">Kategorija</label>
                        <select id="category" className="select select-bordered select-sm w-full" value={offerData.category} onChange={handleField}>
                            <option value='Informacinės technologijos'>Informacinės technologijos</option>
                            <option value='Finansai'>Finansai</option>
                            <option value='Gamyba'>Gamyba</option>
                            <option value='Elektronika'>Elektronika</option>
                            <option value='Statyba'>Statyba</option>
                        </select>
                        <label className="mt-2 font-bold">Ar darbas nuotolinis?</label>
                        <input id="remote" name="remote" type="checkbox" className="toggle self-center" onChange={handleField}/>
                    </div>
                    <button className="btn w-full bg-emerald-700 text-white hover:bg-green-500 transition-all hover:text-black" type="submit">Saugoti</button>
                </form>
                <div className="modal-action flex flex-col">
                    <form method="dialog">
                            <button className="btn w-full bg-black text-white hover:bg-gray-500 transition-all">Uždaryti</button>
                    </form>
                </div>
            </div>
            </dialog>
        </>
    )
    
}