import { OfferDto } from "../../../dto/offer.dto";
import { Offer } from "../../../schemas/offer.schema";

export async function GetOfferService(id: string): Promise<OfferDto> {
    const offer = await Offer.findOne({_id: id})
    return offer
}