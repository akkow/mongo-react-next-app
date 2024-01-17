"use client"
import { useSession } from "next-auth/react"
import { LoginForm } from "../../components/login/LoginForm"
import { ProfileData } from "../../components/profile/ProfileData"
import { UserDto } from "../../dto/user.dto"
import { useEffect, useState } from "react"
import { createUrl } from "../../utils/url"

export default function ProfilePage() {

    const [users, setUsers] = useState<UserDto[]>([])
    const [userDto, setUserDto] = useState<UserDto | undefined>()

    const loadUsers = () => {
        fetch(createUrl(`api/users`), {
            cache: "no-store"
        })
        .then((r) => r.json())
        .then((c) => setUsers(c))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const { status } = useSession()
        if(status === "authenticated") 
        {
            return (
                <ProfileData {...{loadUsers, userDto, setUserDto, users}} />
            )

        }
        if(status === "unauthenticated") 
        {
            return (
                <LoginForm />
            )
        }
}