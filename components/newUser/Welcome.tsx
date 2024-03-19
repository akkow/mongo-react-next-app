import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { ProfileSetUp } from "./ProfileSetUp";
import { UserDto } from "../../dto/user.dto";
import { createUrl } from "../../utils/url";

export function Welcome() {

    const [userDto, setUserDto] = useState<UserDto | undefined>()

    const loadUsers = () => {
        fetch(createUrl(`api/users`), {
            cache: "no-store"
        })
        .then((r) => r.json())
        .then((c) => setUserDto(c))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const [fade, setFade] = useState(true)

    const { data: session } = useSession()

    setInterval(() => {
        setFade(false)
    }, 2000);
    setTimeout(() => {
        document.getElementById('alert-success').style.display = 'none'
    }, 3000);

    const showProfileSetUp = () => {
        document.getElementById('profileSetUp').style.display = 'inherit'
        document.getElementById('card').style.display = 'none'
    }

    return (
        <div>
            <div id="alert-success" className="absolute inset-x-0 max-w-max mx-auto font-bold py-10">
                <div className={`transition-all duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
                    <div className="alert alert-success bg-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Sveikiname sėkmingai užsiregsitravus!</span>
                    </div>
                </div>
            </div>
            <div>
                <div id='card' className="flex flex-col items-center p-40">
                    <div className="card card-side text-white bg-green-500 shadow-xl">
                        <div className="card-body">
                            <h2 className="flex flex-col card-title">{`Malonu, kad Jūs užsiregistravote, ${session.user.name}`}</h2>
                            <p className="mb-5">Toliau Jums reikia užpildyti savo profilį ir sukurti savo CV</p>
                            <div className="flex flex-col items-center font-bold text-xl">
                                <button onClick={showProfileSetUp} className="flex flex-col transition-all duration-200 hover:rounded-xl hover:text-green-500 ease-in-out hover:bg-white px-4 py-1 hover:shadow-xl">Kurti profilį</button>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
            <div id="profileSetUp" className="hidden py-80">
                <ProfileSetUp {...{loadUsers, userDto, setUserDto}} />
            </div>
        </div>
    )

}