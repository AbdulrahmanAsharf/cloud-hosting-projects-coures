import jwt from 'jsonwebtoken';
import {serialize} from 'cookie'





export function generateJWT(jwtpayload) {

    const privateKey = process.env.JWT_SECRET

    const token = jwt.sign(jwtpayload,privateKey,{expiresIn:"30d"})

    return token
}




export function setCookie(jwtpayload){
    const token = generateJWT(jwtpayload)

    const cookie = serialize("jwtToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        path:"/",
        maxAge:60*60*24*30,
    })
    return cookie
}