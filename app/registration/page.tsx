"use client"
import { useEffect, useState } from "react"
import { RegistrationForm } from "../../components/registration/RegistrationForm"
import { createUrl } from "../../utils/url"
import { UserDto } from "../../dto/user.dto"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Registration() {
    const [userDto, setUserDto] = useState<UserDto | undefined>()

    const { status } = useSession()

    if(status==='authenticated')
    {
        redirect('/profile')
    }
    else 
    {
        return (
            <RegistrationForm {...{userDto, setUserDto}} />
        )
    }

}