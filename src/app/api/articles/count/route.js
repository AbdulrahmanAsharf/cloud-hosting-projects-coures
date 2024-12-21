import {  NextResponse  } from "next/server";
import prisma from '@/utils/db'



export async function GET(request) {
    try {
        console.log(request.method);
        const count = await prisma.article.count()
        return NextResponse.json({count},{status:200})

    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "internal server error"}, {status:500})
    }
}