import { ObjectId } from "mongodb";
import { OfferDto } from "../../../dto/offer.dto";
import { Offer } from "../../../schemas/offer.schema";

export async function PutOfferService(offer: OfferDto) {
    await Offer.updateOne(
    { _id: new ObjectId(offer._id) },
    { $set: {
        title: offer.title,
        company: offer.company,
        recruiter: offer.recruiter,
        contact: offer.contact,
        salary: offer.salary,
        city: offer.city,
        remote: offer.remote,
        description: offer.description,
        category: offer.category,
        applicants: offer.applicants
        }
    })
    console.log(`[LOG]: ${offer._id} was updated. ${offer.applicants}`);
    return offer
}