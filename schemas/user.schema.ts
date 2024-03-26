import { Schema, model, models, Document, Model } from "mongoose";

export interface IUser extends Document {
    _id?: string;
    password: string
    name: string
    surname: string
    email: string
    position: string
    phoneNumber: string
    linkedIn: string
    savedOffers: string[]
    isEmployer: boolean
    createdOffers: string[]
    isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
    id: { type: String },
    password: {  
        type: String,
        required: [true, 'Please enter a password']
    },
    name: { 
        type: String,
        required: [true, 'Please enter a name'] 
    },
    surname: { 
        type: String,
        required: [true, 'Please enter a surname']
    },
    email: { 
        type: String, 
        required: [true, 'Please enter an email']
    },
    position: { type: String },
    phoneNumber: { type: String},
    linkedIn: { type: String },
    savedOffers: [{ type: String }],
    isEmployer: { type: Boolean, default: false },
    createdOffers: [{ type: String }],
    isAdmin: { type: Boolean, default: false }
});

export const User: Model<IUser, {}, {}, {}, any> = 
    models.users || model<IUser>("users", UserSchema)