"use client"
import { useEffect, useState } from "react"
import { RegistrationForm } from "../../components/registration/RegistrationForm"
import { createUrl } from "../../utils/url"
import { UserDto } from "../../dto/user.dto"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Registration() {
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

    const { status } = useSession()

    if(status==='authenticated')
    {
        redirect('/profile')
    }
    else 
    {
        return (
            <RegistrationForm {...{loadUsers, userDto, setUserDto}} />
        )
    }

}