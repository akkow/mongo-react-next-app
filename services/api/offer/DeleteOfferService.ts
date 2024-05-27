import { OfferDto } from "../../../dto/offer.dto";
import { Offer } from "../../../schemas/offer.schema";
import { User } from "../../../schemas/user.schema";

export async function DeleteOfferService(id: string): Promise<void> {
    await Offer.deleteOne({_id: id});
    await User.updateMany({savedOffers: id}, {$pull: {savedOffers: id}})
    await User.updateMany({appliedOffers: id}, {$pull: {appliedOffers: id}})
    console.log(`ADMIN LOGS: Offer ${id} has been deleted!`)
    console.log(`ADMIN LOGS: User saved offer ${id} has been deleted!`)
}