"use client";
import React, { useState } from 'react';
import{toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';

const Loginfrom = () => {

    const Router = useRouter()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,Setloading] = useState(false)
    const fromsubmit= async (e)=>{
        e.preventDefault()
        if(email === "" )return toast.error("Email is required");
        if(password === "")return toast.error("Password is required");

        try {
            Setloading(true)
            await axios.post(`${DOMAIN}/api/users/login`, { email, password });
            Router.replace("/")
            Setloading(false)
            toast.success("Login Successfull");
            Router.refresh()
        } catch (error) {
            toast.error(error?.response?.data.message);
            console.log(error)
            Setloading(false)
        }
    }
    
    return (
        <form onSubmit={fromsubmit} className='flex flex-col'>
            <input className='mb-4 text-xl  rounded border p-2' 
                type="email" 
                placeholder='Enter Your Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input className='mb-4 text-xl rounded border p-2' 
                type="password" 
                placeholder='Enter Your Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button disabled={loading} type='submit' className='text-2xl rounded-md text-white bg-blue-800 p-2 font-bold'>
                {loading ? "loading...": "Login"}
            </button>
        </form>
    )
}

export default Loginfrom
