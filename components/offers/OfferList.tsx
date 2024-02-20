import { useSession } from "next-auth/react";
import { OfferDto } from "../../dto/offer.dto";
import Link from "next/link";
import { Combobox } from '@headlessui/react'
import { useState } from "react";
import FilterComboBox from "../filters/FilterComboBox";
import FilterComboBoxCategory from "../filters/FilterComboBoxCategory";

type IProps = {
    offers: OfferDto[]
}

export function OfferList(props: IProps) {

    const { offers } = props

    return (
    <>
        <div className="flex flex-col items-center mt-2 mb-10">
            <h1 className="font-bold text-2xl text-black mt-2 mb-6">Šiuo metu yra {offers.length} {offers.length < 2 ? "skelbimas" : offers.length < 10 ? "skelbimai" : "skelbimų"}</h1>
            <label className="bg-gray-100 input flex items-center gap-6">
                <input type="text" className="text-black bg-gray-100 grow" placeholder="Ieškoti pagal pavadinimą" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="black" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            <button className="mt-4 transition-colors shadow bg-black hover:shadow-xl hover:bg-green-500 hover:rounded-lg py-2 px-6 focus:shadow-outline focus:outline-none font-bold text-md rounded font-semibold leading-6 text-white" type='submit' id="save-btn">
              <div className='flex items-center gap-x-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Ieškoti
              </div>
            </button>
            <div className="inline-flex gap-5 mt-4 mb-4">
                <FilterComboBox />
                <FilterComboBoxCategory />
            </div>
            <button className="mb-4 transition-colors shadow bg-black hover:shadow-xl hover:bg-green-500 hover:rounded-lg py-2 px-6 focus:shadow-outline focus:outline-none font-bold text-md rounded font-semibold leading-6 text-white" type='submit' id="save-btn">
              <div className='flex items-center gap-x-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Ieškoti pagal filtrus
              </div>
            </button>
        {offers.map((offer) => (
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
        </div>
    </>
    )
}