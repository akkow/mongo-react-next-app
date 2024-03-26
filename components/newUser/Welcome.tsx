import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { ProfileSetUp } from "./ProfileSetUp";
import { UserDto } from "../../dto/user.dto";
import { createUrl } from "../../utils/url";
import toast, { Toaster } from "react-hot-toast";
import { LoadingDelay } from "../utils/LoadingDelay";

export function Welcome() {

    const [userDto, setUserDto] = useState<UserDto>({} as UserDto)

    const loadUser = () => {
        fetch(createUrl(`api/users/${session.user._id}`), {
        })
        .then((r) => r.json())
        .then((c) => {
            setUserDto(c)
            document.getElementById('preloader').style.display = 'none'
            document.getElementById('card-container').removeAttribute('hidden')
        })
    }

    useEffect(() => {
        loadUser() 
    }, [])

    const { data: session } = useSession()

    const showProfileSetUp = () => {
        document.getElementById('profileSetUp').style.display = 'inherit'
        document.getElementById('card').style.display = 'none'
    }

    return (
        <>
            <LoadingDelay />
            <div id="card-container" hidden>
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
                    <ProfileSetUp {...{loadUser, userDto, setUserDto}} />
                </div>
            </div>
        </>
    )

}