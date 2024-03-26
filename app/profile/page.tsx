"use client"
import { useSession } from "next-auth/react"
import { LoginForm } from "../../components/login/LoginForm"
import { ProfileData } from "../../components/profile/ProfileData"
import { UserDto } from "../../dto/user.dto"
import { useEffect, useState } from "react"
import { createUrl } from "../../utils/url"

export default function ProfilePage() {

    const [user, setUsers] = useState<UserDto[]>([])
    const [userDto, setUserDto] = useState<UserDto | undefined>()

    const { data: session } = useSession();
    const loadUser = () => {
        fetch(createUrl(`api/users/${session.user._id}`), {
            cache: "no-store"
        })
        .then((r) => r.json())
        .then((c) => setUsers(c))
    }

    useEffect(() => {
        loadUser()
    }, [])

    const { status } = useSession()
        if(status === "authenticated") 
        {
            return (
                <ProfileData {...{loadUser, userDto, setUserDto, user}} />
            )

        }
        if(status === "unauthenticated") 
        {
            return (
                <LoginForm />
            )
        }
}