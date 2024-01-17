import { signIn } from "next-auth/react"
import { ChangeEvent, FormEvent, useRef, useState } from "react"

export function LoginForm() {

    const [userInfo, setUserinfo] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const res = await signIn("credentials", {
            email: userInfo.email,
            password: userInfo.password,
            redirect: true,
            callbackUrl: '/offers'
        })

        if(res?.error) setError(error)

        console.log(error)
    }

    const handleChangeField = (e: ChangeEvent<any>) => {
        setUserinfo({...userInfo, [e.target.id]: e.target.value})
    }
    return (        
        <div className="relative flex flex-col items-center bg-transparent bg-clip-border text-gray-700 py-20">
            <div className="flex mx-3 p-6 shadow-xl rounded-xl">
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <h4 className="block font-sans text-2xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased mb-4 text-center">
                        Prisijungimas
                        </h4>
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input id="email" value={userInfo.email} onChange={handleChangeField} className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            El. paštas
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input id="password" value={userInfo.password} onChange={handleChangeField} type="password" className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Slaptažodis
                            </label>
                        </div>
                    </div>
                    <button onClick={() => signIn("credentials")} className="mt-6 block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                    type="submit" data-ripple-light="true">Prisijungti
                    </button>
                        <p className="mt-4 mb-5 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">Pamiršote slaptažodį? 
                            <a className="font-bold text-green-500 hover:underline" href="/loginReset">Atstatyti slaptažodį</a>
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="py-2 px-5 hover:bg-green-500 hover:shadow-xl hover:text-white transition-all hover:rounded-xl">
                                <a className="text-xl font-bold" href="/registration">Registruotis</a>
                            </div>
                        </div>
                </form>
            </div>
        </div>

    )
}