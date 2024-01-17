import { UserDto } from "../../../dto/user.dto";
import { User } from "../../../schemas/user.schema";

export async function DeleteSavedOfferService(user: UserDto): Promise<void> {
    const res = await User.updateOne(
        {},
        { 
            $pop: { savedOffers: 1 }
        })
    console.log(res)
}