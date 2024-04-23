import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



const protectRoutes = ['/feed']


export default function middleware(req: NextRequest) {
    const token = localStorage.getItem('accessToken')
    if (!token && protectRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/", req.nextUrl.origin)
        return NextResponse.redirect(absoluteURL.toString())
    }
    
};
