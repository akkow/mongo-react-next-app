import { OfferDto } from "../../../dto/offer.dto";
import { Offer } from "../../../schemas/offer.schema";

export async function PutOfferService(offer: OfferDto): Promise<void> {
    await Offer.create
    ({
        title: offer.title,
        company: offer.company,
        recruiter: offer.recruiter,
        contact: offer.contact,
        salary: offer.salary,
        city: offer.city,
        remote: offer.remote,
        description: offer.description,
        category: offer.category,
    })
    console.log("new offer has been created...")
}