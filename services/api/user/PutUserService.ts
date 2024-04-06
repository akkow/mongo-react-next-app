import { ObjectId } from "mongodb"
import { UserDto } from "../../../dto/user.dto"
import { User } from "../../../schemas/user.schema"

export async function PutUserService(user: UserDto) {
    const savedOffers = user.savedOffers.filter(i => i !== null)
    await User.updateOne
        (
            { _id: new ObjectId(user._id) },
            {
                $set: { surname: user.surname, email: user.email, name: user.name, linkedIn: user.linkedIn, phoneNumber: user.phoneNumber, position: user.position, savedOffers: savedOffers, company: user.company, createdOffers: user.createdOffers }
            }
        )
    console.log(user)
    return user
}