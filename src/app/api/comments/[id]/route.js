import {  NextResponse } from "next/server";
import  prisma  from "@/utils/db";
import {verifyToken} from '@/utils/verifyToken'


export async function PUT(request,{ params } ){
    try {
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });
        if (!comment) {
            return NextResponse.json({ message: 'comment not found' }, { status: 404 });
        }


        const user = verifyToken(request);
        if (user === null || user.id !== comment.userId) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            )
        }

        const body = await request.json();
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(params.id) },
            data: { text: body.text }
        });
        return NextResponse.json(updatedComment, { status: 200 });
    } catch (error) {
        console.error( error);
        return NextResponse.json({ message:"internal server error" }, { status: 500 });
    }
}



export async function DELETE(request,{ params } ){
    try {
        const comment = await prisma.comment.findUnique({where:{id:parseInt(params.id)}})
        if(!comment){
            return NextResponse.json(
                {message: 'Comment not found'},
                {status:404})
        }

        const user = verifyToken(request);
        if (user === null) {
            return NextResponse.json(
                { message: 'no token provided, access denied' },
                { status: 401 }
            )
        }

        if (user.isAdmin || user.id === comment.userId) {
            await prisma.comment.delete({ where: { id: parseInt(params.id) } });
            return NextResponse.json(
                { message: 'comment deleted' },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { message: 'you are not allowed, access denied' },
            { status: 403 }
        )
    } catch (error) {
        console.error( error);
        return NextResponse.json({ message:"internal server error" }, { status: 500 });
    }
}