import { Schema, model, models, Document, Model } from "mongoose";

export interface IUser extends Document {
    _id?: string;
    password: string
    name: string
    surname: string
    email: string
    position: string
    phoneNumber: number
    linkedIn: string
    savedOffers: any[]
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
    phoneNumber: { type: Number},
    linkedIn: { type: String },
    savedOffers: [{ type: String }],
});

export const User: Model<IUser, {}, {}, {}, any> = 
    models.users || model<IUser>("users", UserSchema)