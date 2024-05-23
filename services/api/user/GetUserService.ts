import { UserDto } from "../../../dto/user.dto";
import { User } from "../../../schemas/user.schema";
import { _id } from "@next-auth/mongodb-adapter/dist";

export async function GetUserService(id: string): Promise<UserDto> {
    const user = await User.findOne({_id: id})
    user.password = '';
    return user
}