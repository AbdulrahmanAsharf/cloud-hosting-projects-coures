import {  NextResponse } from "next/server";
import {loginSchema } from "@/utils/validation"
import  prisma  from "@/utils/db";
import bcrypt from "bcryptjs"
import {setCookie} from '@/utils/token'



export async function POST(request){
    try {
        const body = await request.json()
        
        const validation =loginSchema .safeParse(body)
        if(!validation.success){
            return NextResponse.json(
                {message:validation.error.errors[0].message},
                {status:400})
        }

        const user = await prisma.user.findUnique({where:{email:body.email}})
        if(!user){
            return NextResponse.json(
                {message:"invalid email or password"},
                {status:404})
        }
        
        const passwordmatch =await bcrypt.compare(body.password,user.password)
        if(!passwordmatch){
            return NextResponse.json(
                {message:"Iinvalid email or password'"},
                {status:400})
        }
        const cookie = setCookie({
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username
        });


        return NextResponse.json(
            {message:"Authenicated"},
            {
                status:200,
                headers:{"Set-Cookie":cookie}
            }
        )

    } catch (error) {
        console.error( error);
        return NextResponse.json(
            { message:"internal server error" }, 
            { status: 500 });
    }
}