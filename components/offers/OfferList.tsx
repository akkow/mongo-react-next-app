'use client'

import { useSession } from "next-auth/react";
import { OfferDto } from "../../dto/offer.dto";
import Link from "next/link";
import { Combobox } from '@headlessui/react'
import { ChangeEvent, FormEvent, useState } from "react";
import FilterComboBox from "../filters/FilterComboBox";
import FilterComboBoxCategory from "../filters/FilterComboBoxCategory";
import { useRouter, useSearchParams } from "next/navigation";

type IProps = {
    offers: OfferDto[]
}

export function OfferList(props: IProps) {

    const { offers } = props

    const [searchTitle, setSearchTitle] = useState('');
    const [cityTitle, setCityTitle] = useState('');
    const [categoryTitle, setCategoryTitle] = useState('');
    let initialList = 5
    let incrementLoadMore = 20
    let filterOffersByParams = offers

    const [displayList, setDisplayList] = useState(initialList)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value);
    };
    
    
    const searchParams = useSearchParams();
    const titleSearch = searchParams.get('title');
    const citySearch = searchParams.get('city');
    const categorySearch = searchParams.get('category');

    const router = useRouter();
    const setParams = () => {
        router.push(`?title=${searchTitle}`)
    }

    if(titleSearch) {
        filterOffersByParams = offers.filter(i => i.title.includes(titleSearch))
    }
    console.log(offers.filter(i => i.title.includes(titleSearch)))

    const loadMore = () => {
        setDisplayList(displayList + incrementLoadMore)
    }
    return (
    <>
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
                <label className="mt-7 input input flex items-center gap-2 bg-zinc-100">
                    <input onChange={handleChange} id="search-input" type="text" className="grow bg-zinc-100 text-black" placeholder="Ieškoti" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                </label>
                <FilterComboBox />
                <FilterComboBoxCategory />
                <button onClick={() => setParams()} className="mt-7 transition-colors shadow bg-black hover:shadow-xl hover:bg-green-500 hover:rounded-lg py-2 px-6 focus:shadow-outline focus:outline-none font-bold text-md rounded font-semibold leading-6 text-white" type='submit' id="save-btn">
                    <div className="flex items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        Ieškoti
                    </div>
                </button>
            </div>
        </div>
        <div className="flex flex-col items-center mt-2 mb-10">
            <h1 className="font-bold text-2xl text-black mt-2 mb-6">Rodomi {filterOffersByParams.slice(0, displayList).length} {filterOffersByParams.slice(0, displayList).length < 2 ? "skelbimas" : filterOffersByParams.slice(0, displayList).length < 10 ? "skelbimai" : "skelbimų"}</h1>
        {filterOffersByParams.slice(0, displayList).map((offer) => (
            <Link href={`/offers/${offer._id}`} key={offer._id} id='offer-card' className="flex flex-col items-center mb-4">
                <div className="max-w-lg w-[500px]">
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
        {displayList < filterOffersByParams.length ? <button onClick={() => loadMore()} className="mt-7 transition-colors shadow bg-black hover:shadow-xl hover:bg-green-500 hover:rounded-lg py-2 px-6 focus:shadow-outline focus:outline-none font-bold text-md rounded font-semibold leading-6 text-white" type='submit' id="save-btn">
            <div className="flex items-center gap-x-2">
                Rodyti daugiau
            </div>
        </button> : ''}
        </div>
    </>
    )
}