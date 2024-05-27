export class UserDto {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    position: string;
    phoneNumber: string;
    linkedIn: string;
    password: string;
    savedOffers: string[];
    isEmployer: boolean;
    createdOffers: string[];
    isAdmin: boolean;
    company: string;
    appliedOffers: string[];
}