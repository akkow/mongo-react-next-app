export class OfferDto {
    _id?: string;
    title: string;
    company: string;
    recruiter: string;
    contact: string;
    salary: number;
    city: string;
    remote: boolean;
    description: string;
    category: string;
    created_by: string;
    applicants: string[];
}