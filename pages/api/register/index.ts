import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextRequest, NextResponse, userAgent } from "next/server";
import connect from "../../../lib/mongoose";
import { hash } from "bcryptjs";
import { UserDto } from "../../../dto/user.dto";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../schemas/user.schema";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    await connect();
    
    const user = await req.body;
    const isUserFound = await User.findOne({email: user.email})
    if(isUserFound)
    {
        console.log("duplicate email was found..")
        res.json({error: 'El. paštas jau egzistuoja.'})
    } 
    else  
    { 
        console.log('creating new user...')
        const hashedPassword = await hash(user.password, 10)
        await User.create
        ({
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: hashedPassword,
            linkedIn: '',
            position: '',
            phoneNumber: '',
            isEmployer: user.isEmployer,
            isAdmin: false,
            company: user.company
        })
        console.log("new user registered..")
        res.json({ok: 'Nice'})
    }
}