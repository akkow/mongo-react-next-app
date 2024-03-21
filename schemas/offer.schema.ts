import { Schema, model, models, Document, Model } from "mongoose";

export interface IOffer extends Document {
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
}

const OfferSchema: Schema = new Schema({
    title: {  
        type: String,
        required: [true, 'Please enter a title'],
        maxlength: [30, 'Iki 30 ženklų']
    },
    company: { 
        type: String,
        required: [true, 'Please enter a company name'],
        maxlength: [20, 'Iki 20 ženklų']
    },
    recruiter: { 
        type: String,
        required: [true, 'Please enter a recruiter name'],
        maxlength: [20, 'Iki 20 ženklų']
    },
    contact: { 
        type: String, 
        required: [true, 'Please enter contact information'],
        maxlength: [20, 'Iki 20 ženklų']
    },
    salary: { 
        type: Number, 
        required: [true, 'Please enter a salary'],
        maxlength: [20, 'Iki 20 ženklų']
    },
    city: { 
        type: String, 
        required: [true, 'Please enter a city'],
        maxlength: [20, 'Iki 20 ženklų']
    },
    remote: { 
        type: Boolean,
        default: false
    },
    description: { 
        type: String, 
        required: [true, 'Please enter a description'],
        maxlength: [2000, 'Iki 2000 ženklų']
    },
    category: { 
        type: String,
        default: 'Informacinės technologijos',
        required: [true, 'Please select a category'],
    },
    created_by: {
        type: String,
    }
});

export const Offer: Model<IOffer, {}, {}, {}, any> = 
    models.offers || model<IOffer>("offers", OfferSchema)