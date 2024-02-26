import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserDto } from "../../dto/user.dto";
import { createUrl } from "../../utils/url";
import { signIn } from "next-auth/react";
import { NextApiResponse } from "next";
import { sign } from "crypto";
import { FieldValues, useForm } from "react-hook-form";

type IProps = { 
    loadUsers: () => void
    userDto?: UserDto
    setUserDto: (c: UserDto) => void
}

export function RegistrationForm(props: IProps) {

    const { loadUsers, userDto, setUserDto} = props
    const [registrationData, setRegistrationData] = useState<UserDto>({} as UserDto)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues
    } = useForm();
    
    useEffect(() => {
        if (userDto) setUserDto(userDto)
    }, [userDto])

    const signInUser = async () => {
        signIn("credentials", {
            email: getValues('email'),
            password: getValues('password'),
            redirect: true,
            callbackUrl: `/auth/newUser`
        })
    };

    const onSubmit = async (data: FieldValues) => {
        // set validation data to registration data and post user to db
        registrationData.email = getValues('email')
        registrationData.password = getValues('password')
        registrationData.name = getValues('name')
        registrationData.surname = getValues('lastname')

        const link = `api/users`      
        fetch(createUrl(link), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registrationData),
        })
        .then((res) => {
            if(registrationData) setUserDto(undefined)
            loadUsers()
        })
        .then(signInUser)
        .catch((e) => console.log(e))
    }
    return (
        <div className="relative flex flex-col items-center bg-transparent bg-clip-border text-gray-700 py-20">
            <div className="flex mx-3 p-6 shadow-xl rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" noValidate>
                        <h4 className="block font-sans text-2xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased mb-4 text-center">
                        Registracija
                        </h4>
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input {...register('name', { required: 'Vardas yra privalomas.' })} 
                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "/>
                            {errors.name && (<p className="peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-xs flex items-center flex-col text-red-500">{errors.name.message}</p>)}
                            <label htmlFor='name' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Vardas
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input {...register('lastname', { required: 'Pavardė yra privaloma.' })}
                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                            placeholder=""/>
                            {errors.lastname && (<p className="peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-xs flex items-center flex-col text-red-500">{errors.lastname.message}</p>)}
                            <label htmlFor='surname' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Pavardė
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input {...register('email', { required: 'El. yra paštas privalomas.', pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Netinkamas el. paštas.', } })}
                            type="email"
                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                            placeholder=" "/>
                            {errors.email && (<p className="peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-xs flex items-center flex-col text-red-500">{errors.email.message}</p>)}
                            <label htmlFor='email' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            El. paštas
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input {...register('password', { required: 'Slaptažodis yra reikalingas.', minLength: { value:8, message: 'Slaptažodis turi būti nors 8 simbolių.' } })}
                            type="password" 
                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>
                            {errors.password && (<p className="peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-xs flex items-center flex-col text-red-500">{errors.password.message}</p>)}
                            <label htmlFor='password' className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Slaptažodis
                            </label>
                        </div>
                    </div>
                    <div className="inline-flex items-center">
                        <label className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="checkbox" data-ripple-dark="true">
                            <input {...register('confirmTOS', { required: 'Jūs turite sutikti su mūsų saligomis.' })}
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10" />
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                        <label className="mt-px cursor-pointer select-none font-light text-gray-700" htmlFor="checkbox">
                            <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                                Aš sutinku su
                                <a className="font-medium transition-colors hover:text-green-500" href="#">
                                    &nbsp;Paslaugų teikimo taisyklėmis ir sąlygomis
                                </a>
                            </p>
                        </label>
                    </div>
                    {errors.confirmTOS && (<p className="peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-xs flex items-center flex-col text-red-500">{errors.confirmTOS.message}</p>)}
                    <button className="mt-6 block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" data-ripple-light="true">
                        Registruotis
                    </button>
                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                        Jau turite paskyrą? 
                        <a className="font-bold text-green-500 hover:underline" href="/auth/login">
                            Prisijungti
                        </a>
                    </p>
                </form>
            </div>
        </div>      
    )
}