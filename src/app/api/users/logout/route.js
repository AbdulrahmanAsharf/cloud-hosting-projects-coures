import { cookies } from "next/headers";
import {  NextResponse } from "next/server";


export async function GET(request){
    try {
        console.log(request.method);
        cookies().delete("jwtToken")
        return NextResponse.json({message: "logout"}, {status: 200})
    } catch (error) {
        console.error( error);
        return NextResponse.json({ message:"internal server error" }, { status: 500 });
    }
}