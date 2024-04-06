import { withAuth } from "next-auth/middleware";

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({ req, token }) {
            if(token) { 
                if((token as any).user.isAdmin == false && req.nextUrl.pathname == '/dashboard') {
                    return false
                }
                else if((token as any).user.isEmployer == false && req.nextUrl.pathname == '/createNewOffer') {
                    return false
                }
                else{
                    return true
                }
            }
            return !!token;
        },
    },
});

export const config = { matcher: ['/dashboard', '/createNewOffer', '/offers', '/profile', '/savedoffers'] }