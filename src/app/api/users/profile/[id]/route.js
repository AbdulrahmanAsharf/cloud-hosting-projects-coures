import {  NextResponse  } from "next/server";
import  prisma  from "@/utils/db";
import {verifyToken} from '@/utils/verifyToken'
import bcrypt from 'bcryptjs'
import {updateUserSchema } from '@/utils/validation'

export async function DELETE( request,{ params }) {
    try {
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(params.id) },
            include: { comments: true }
        });
        if (!user) {
            return NextResponse.json(
                { message: 'user not found' },
                { status: 404 }
            );
        }

        const userfromtoken= verifyToken(request)
        if(userfromtoken!== null && userfromtoken.id === user.id){
            await prisma.user.delete({where:{id:parseInt(params.id)}})

            const commentids = user?.comments.map(comment => comment.id)
            await prisma.comment.deleteMany({where:{id:commentids}})

            return NextResponse.json(
                {message:"your proflie has been delete"},
                {status:200}
            );
        }

        return NextResponse.json(
            { message: 'only user himself can delete his profile, forbidden' },
            { status: 403 }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}




export async function GET(request,{ params }) {
    try {
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(params.id)},
            select:{
                id:true,
                email:true,
                username:true,
                isAdmin:true,
                createAt:true,
                
            }
        });
        if (!user) {
            return NextResponse.json(
                {message:"user not found"},
                {status:404}
            );
        }

        const userfromtoken= verifyToken(request)
        if(userfromtoken === null || userfromtoken.id !== user.id){
            return NextResponse.json(
                {message:"you are not allowed,access"},
                {status:403}
            );
        }

        return NextResponse.json(
            user,
            {status:200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}









export async function PUT(request,{ params }){
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) }});
        if(!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            )
        }

        const body = await request.json()

        const validation =updateUserSchema.safePrase(body)
        if(!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            )
        }
        if(body.password) {
            
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt); 
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                username: body.username,
                email: body.email,
                password: body.password
            }
        });

        const  { password ,...other} = updatedUser
        console.log(password)
        return NextResponse.json({...other},{status:200})
        } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}