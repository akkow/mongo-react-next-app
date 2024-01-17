import bcrypt from "bcryptjs";

export async function verifyPassword(password: string, hashPassword: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (error, isMatch) => {
            if(error) {
                console.error(error);
                reject(error);
            } else {
                resolve(isMatch);
            }
        });
    });
}