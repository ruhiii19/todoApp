import { NextResponse, NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const{username,password}=await req.json();
    if(username==="admin" && password==="password"){
        const res = NextResponse.json({message:"Login successful"},{status:200});
        
        // Set a cookie to indicate the user is logged in
        res.cookies.set("isLoggedIn", "true", { httpOnly: true });
        return res;
    }
    return NextResponse.json({message:"Invalid credentials"},{status:401});
}
