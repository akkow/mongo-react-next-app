import { UserDto } from "../../../dto/user.dto";
import { User } from "../../../schemas/user.schema";
import { _id } from "@next-auth/mongodb-adapter";

export async function GetUserService(id: string): Promise<UserDto> {
    const users = await User.findOne({_id: id})
    return users
}