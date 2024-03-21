import { withAuth } from "next-auth/middleware";

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({ req, token }) {
            return !!token;
        },
    },
});

export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)']}