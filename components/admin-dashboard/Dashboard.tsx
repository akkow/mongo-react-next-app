import React, { useState, useEffect } from 'react';
import { createUrl } from '../../utils/url';
import { OfferDto } from '../../dto/offer.dto';
import { LoadingDelay } from '../utils/LoadingDelay';

export default function DashBoardPage() {

    const [data, setData] = useState<OfferDto[]>([])

    useEffect(() => {
        fetch(createUrl('api/offers'))
        .then((r) => r.json())
        .then((e) => {
            setData(e);
            document.getElementById('preloader').style.display = 'none';
        })
    }, [data])

    function handleDelete(id: string) {
        fetch(`/api/offers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        setData(data)
    };
    let i = 1;
    return (
        <>
            <div className="overflow-x-auto mt-20 p-4">
                <table className="table border-2 border-indigo-600">
                    <thead>
                        <tr className='text-center text-purple-800 border-2 border-indigo-600'>
                            <th></th>
                            <th>id</th> 
                            <th>Sukurė</th> 
                            <th>Pavadinimas</th> 
                            <th>Kompanija</th> 
                            <th>Miestas</th> 
                            <th>Atlyginimas</th> 
                            <th>Darbdavys</th> 
                            <th>Kategorija</th> 
                            <th>Trinimas</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {data.map((item) => (
                        <tr className='hover:bg-indigo-100 transition-all'>
                            <th className='border-2 border-indigo-600 text-center'>{i++}</th> 
                            <td className='border-2 border-indigo-600 text-center'>{item._id}</td>
                            <td className='border-2 border-indigo-600 text-center'>{item.created_by}</td> 
                            <td className='border-2 border-indigo-600 text-center'>{item.title}</td> 
                            <td className='border-2 border-indigo-600 text-center'>{item.company}</td> 
                            <td className='border-2 border-indigo-600 text-center'>{item.city}</td> 
                            <td className='border-2 border-indigo-600 text-center'>{item.salary}</td> 
                            <td className='border-2 border-indigo-600 text-center'>{item.recruiter}</td> 
                            <td className='border-2 border-indigo-600 text-center'>{item.category}</td>
                            <td className='hover:bg-red-200 border-2 border-indigo-600 text-center p-1'>
                                <button onClick={() => handleDelete(item._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td> 
                        </tr>
                        ))}
                    </tbody> 
                    <tfoot>
                        <tr className='text-center text-purple-800 border-2 border-indigo-600'>
                            <th></th>
                            <th>id</th> 
                            <th>Sukurė</th> 
                            <th>Pavadinimas</th> 
                            <th>Kompanija</th> 
                            <th>Miestas</th> 
                            <th>Atlyginimas</th> 
                            <th>Darbdavys</th> 
                            <th>Kategorija</th>
                            <th>Trinimas</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <LoadingDelay />
        </>
    )
};
