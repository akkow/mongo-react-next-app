import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserDto } from "../../dto/user.dto";
import { createUrl } from "../../utils/url";
import { _id } from "@next-auth/mongodb-adapter/dist"
import { ObjectId } from "mongodb";
import toast, { Toaster } from "react-hot-toast";

type IProps = {
    loadUser: () => void 
    userDto?: UserDto
    setUserDto: (c: UserDto) => void
    user: UserDto[]
}

export function ProfileData(props: IProps) {
    const { data: session } = useSession()
    
    const { loadUser, setUserDto, userDto, user} = props
    const [profileShowingData, setProfileShowingData] = useState<UserDto>({} as UserDto)

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileShowingData({ ...profileShowingData, [e.target.id]: e.target.value })
    } 

    useEffect(() => {
        fetch(`/api/users/${session.user._id}`)
        .then((res) => res.json())
        .then((data) => 
        {
            setProfileShowingData(data)
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        fetch(`api/users/${session.user._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileShowingData),
        })
        .then((c) => {
            if(c.status == 200) {
                toast.success('Sėkmingai redagavote profilį.')
            } else {
                toast.error('Įvyko klaida, nepavyko redaguoti profilio.')
            }
        })
        .catch((e) => console.log(e))
    }
    
    const showHideEditForm = () => {
        document.getElementById('form-edit').style.display = 'inherit'
        document.getElementById('profile-card').style.display = 'none'
        document.getElementById('back-button').style.display = 'inherit'
    }

    const goBack = () => {
        document.getElementById('form-edit').style.display = 'none'
        document.getElementById('back-button').style.display = 'none'
        document.getElementById('profile-card').style.display = 'inherit'
    }

    return (
    <>
        <Toaster />
        <div id='profile-card' className="flex items-center my-40 w-full justify-center">
            <div className="max-w-lg">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                        <img className="w-32 h-32 rounded-full mx-auto" src="https://t4.ftcdn.net/jpg/05/09/59/75/360_F_509597532_RKUuYsERhODmkxkZd82pSHnFtDAtgbzJ.jpg" alt="Dog" />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{profileShowingData.name}</h3>
                        <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>{profileShowingData.position}</p>
                        </div>
                            <table className="text-xs my-3">
                                <tbody>
                                <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">LinkedIn</td>
                                        <td className="px-2 py-2">{profileShowingData.linkedIn}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Telefono nr.</td>
                                        <td className="px-2 py-2">{profileShowingData.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">El. paštas</td>
                                        <td className="px-2 py-2">{profileShowingData.email}</td>
                                    </tr>
                                </tbody>
                            </table>   
                        <div className="flex flex-col items-center">
                            <button onClick={() => showHideEditForm()} className="transition-all text-md text-green-500 p-2 hover:bg-green-500 hover:rounded-full hover:text-white font-medium" type="button">Redaguoti</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='form-edit' className="hidden flex flex-col items-center inset-0 py-40 bg-transparent bg-clip-border text-gray-700 bottom-40 mt-4">
            <div className="flex mx-3 p-6 shadow-xl rounded-xl">
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" noValidate>
                    <h4 className="block font-sans text-2xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased mb-4 text-center">
                    Profilio redagavimas
                    </h4>
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-6 justify-contents">
                            <div className="relative h-11 w-50">
                                <input onChange={handleField} value={profileShowingData.name} required id="name" className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>                                        
                                <label htmlFor='linkedIn' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Vardas
                                </label>
                            </div>
                            <div className="relative h-11 w-50">
                                <input onChange={handleField} value={profileShowingData.surname} required id="surname" className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=""/>
                                <label htmlFor='phoneNumber' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Pavardė
                                </label>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 justify-contents">
                            <div className="relative h-11 w-50">
                                <input onChange={handleField} value={profileShowingData.linkedIn} required id="linkedIn" className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>                                        
                                <label htmlFor='linkedIn' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Linked In
                                </label>
                            </div>
                            <div className="relative h-11 w-50">
                                <input onChange={handleField} value={profileShowingData.phoneNumber} required id="phoneNumber" className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=""/>
                                <label htmlFor='phoneNumber' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Telefono numeris
                                </label>
                            </div>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input onChange={handleField} value={profileShowingData.position} required type="text" id="position" className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>
                            <label htmlFor='position' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Jūsų specialybė
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input onChange={handleField} value={profileShowingData.email} required type="text" id="email" className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>
                            <label htmlFor='position' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            El. paštas
                            </label>
                        </div>
                    </div>
                    <button
                    className="mt-6 block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    data-ripple-light="true"
                    >
                    saugoti
                    </button>
                </form>
            </div>
            <div id='back-button' className="hidden my-4 flex flex-col items-center justify-center">
                <button onClick={goBack} className="">
                    <div className="rounded-full bg-black text-white p-2 transition-all hover:bg-green-500">
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </>
    )
}