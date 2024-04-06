import { hash } from "bcryptjs"
import { UserDto } from "../../../dto/user.dto"
import { User } from "../../../schemas/user.schema"

export async function PostUserService(user: UserDto): Promise<void> {
    const isUserFound = await User.findOne({email: user.email})
    if(isUserFound)
    {
        console.log("duplicate email was found..")
    } 
    else  
    { 
        console.log('creating new user...')
        const hashedPassword = await hash(user.password, 10)
        await User.create
        ({
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: hashedPassword,
            linkedIn: '',
            position: '',
            phoneNumber: '',
            isEmployer: user.isEmployer,
            isAdmin: user.isAdmin,
            company: user.company
        })
        console.log("new user registered..")
    }
}