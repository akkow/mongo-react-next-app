import NextAuth from "next-auth"
import { UserDto } from "../dto/user.dto"

declare module "next-auth" {
    interface Session {
        user: UserDto;
    }
}