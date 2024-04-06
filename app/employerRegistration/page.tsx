"use client"
import { useEffect, useState } from "react"
import { createUrl } from "../../utils/url"
import { UserDto } from "../../dto/user.dto"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { RegistrationFormEmployer } from "../../components/registration/RegistrationFormEmployer"

export default function EmployerRegistrationPage() {
    const [userDto, setUserDto] = useState<UserDto | undefined>()

    const loadEmployer = () => {
        fetch(createUrl(`api/users`), {
            cache: "no-store"
        })
        .then((r) => r.json())
        .then((c) => setUserDto(c))
    }

    useEffect(() => {
        loadEmployer()
    }, [])

    const { status } = useSession()

    if(status==='authenticated')
    {
        redirect('/profile')
    }
    else 
    {
        return (
            <RegistrationFormEmployer {...{loadEmployer, userDto, setUserDto}} />
        )
    }

}