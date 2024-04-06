import NextAuth, { NextAuthOptions } from "next-auth";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter/dist";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, User } from "../../../schemas/user.schema";
import connect from "../../../lib/mongoose";
import { verifyPassword } from "../../../lib/auth";
import { UserDto } from "../../../dto/user.dto"

let userAccount: UserDto = null;

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "El. paštas",
                    type: "email",
                    placeholder: "vartotojo el. paštas",
                },
                password: { label: "Slaptažodis", type: "password"},
            },
            async authorize(credentials, req) {
                await connect()
                const user: IUser = await User.findOne({
                    email: credentials.email,
                })
                if(!user) {
                    throw new Error("Nerastas vartotojas.")
                }
                const isAuthenticated = await verifyPassword(
                    credentials.password,
                    user.password
                )

                if (!isAuthenticated) throw new Error("Netinkamas slaptažodis, bandykite dar kartą.")
                userAccount = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    position: user.position,
                    phoneNumber: user.phoneNumber,
                    password: user.password,
                    linkedIn: user.linkedIn,
                    savedOffers: user.savedOffers,
                    isEmployer: user.isEmployer,
                    createdOffers: user.createdOffers,
                    isAdmin: user.isAdmin,
                    company: user.company
                }
                return userAccount as any
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 20 * 60, // one hour
        updateAge: 10 * 60,
    },
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async session({ session, token, user}) {
            const s: any = session
            if (userAccount !== null) {
                s.user = userAccount;
                return s
            } else if (
                typeof token.user !== typeof undefined &&
                (typeof s.user === typeof undefined || 
                    typeof s.user !== typeof undefined)
            )
                s.user = token.user as any;
            else if (typeof token !== typeof undefined) s.token = token

            return s
        },

        async jwt({ token, user, account, profile, isNewUser }) {
            if (typeof user !== typeof undefined) {
                token.user = user;
            }
            return token
        },
    },
    pages: {
        signIn:  '/auth/login',
        error: '/auth/error-login',
        newUser: '/auth/newUser'
    }
}
export default NextAuth(authOptions)
