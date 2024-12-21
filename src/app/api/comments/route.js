import {  NextResponse } from "next/server";
import  prisma  from "@/utils/db";
import {verifyToken} from '@/utils/verifyToken'
import {createCommentShema} from '@/utils/validation'


/**
 *  @method  POST
 *  @route   ~/api/comments
 *  @desc    Create New Comment
 *  @access  private (only logged in user)
 */



export async function POST(request){
    try {
        const user = verifyToken(request)
        if(!user){
            return NextResponse.json(
                {message:"only logged in user"},
                {status:401}
            )
        }

        const body = await request.json()

        const validation = createCommentShema.safeParse(body)
        if(!validation.success){
            return NextResponse.json(
                {message:validation.error.errors[0].message},
                {status:400})
        }

        const newcomment = await prisma.comment.create({
            data:{
                text:body.text,
                articleId:body.articleId,
                userId:user.id
            }
        })

        return NextResponse.json(newcomment,{status:201})
    } catch (error) {
        console.error( error);
        return NextResponse.json({ message:"internal server error" }, { status: 500 });
    }
}




/**
 *  @method  GET
 *  @route   ~/api/comments
 *  @desc    Get All Comments
 *  @access  private (only admin)
 */
export async function GET  (request)  {
    try {
        const user = verifyToken(request)
        if(user === null || user.isAdmin === false){
            return NextResponse.json(
                {message:"only logged in user"},
                {status:401}
            )
        }
        const comments = await prisma.comment.findMany()
        return NextResponse.json(comments,{status:200})
    } catch (error) {
        console.error( error);
        return NextResponse.json({ message:"internal server error" }, { status: 500 });
    }
}
