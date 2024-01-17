import { UserDto } from "../../../dto/user.dto";
import { User } from "../../../schemas/user.schema";

export async function GetUsersService(): Promise<UserDto[]> {
    const users = await User.find({})
    return users
}