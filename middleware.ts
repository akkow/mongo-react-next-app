import { withAuth } from "next-auth/middleware";

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({ req, token }) {
            // `/admin` requires admin role
            if(req.nextUrl.pathname === "/admin") {
                return token?.userRole === "admin";
            }
            return !!token;
        },
    },
});

export const config = { matcher: ["/admin", "/offers", "/profile", "/createnewoffer"] };