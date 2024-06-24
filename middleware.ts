import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";

 
export default authMiddleware({

  afterAuth(auth,req,res){
    if(!auth.userId && !auth.isPublicRoute){
        return redirectToSignIn({ returnBackUrl: req.url });
    }
    if(auth.userId && !auth.isPublicRoute){
        return NextResponse.next();
    }
    return NextResponse.next();
  },
  // Routes that can be accessed while signed out
  publicRoutes: ["/api/uploadthing","/api/webhook","/"],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/no-auth-in-this-route"],
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};