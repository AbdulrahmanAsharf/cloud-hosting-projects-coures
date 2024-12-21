import {  NextResponse } from "next/server";
import { registerSchema} from'@/utils/validation'
import  prisma  from "@/utils/db";
import bcrypt from "bcryptjs"
import {setCookie} from '@/utils/token'



/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User [(Register) (Sign Up) (انشاء حساب)]
 *  @access  public
 */



export async function POST(request) {
    try {
        const body = await request.json();

        const validation = registerSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message:validation.error.errors[0].message},{status:400})
        }

        const user =await prisma.User.findUnique({where:{email:body.email}})
        if(user){
            return NextResponse.json({message:"Email already exists"},{status:400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newuser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword
            },
            select:{
                username:true,
                id:true,
                isAdmin:true,
            }
        })

        const jwtpayload = {
            id:newuser.id,
            username:newuser.username,
            isAdmin:newuser.isAdmin
            
        }

        const cookie = setCookie(jwtpayload)
        return NextResponse.json({...newuser ,message:"registered & Authenticated"}, { 
            status: 201,
            headers: {"Set-Cookie":cookie}
        });
    } catch (error) {
        console.error( error);
        return NextResponse.json({ message:"internal server error" }, { status: 500 });
    }
}

