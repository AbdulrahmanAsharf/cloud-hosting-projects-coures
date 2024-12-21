"use client";
import React, { useState } from 'react';
import{toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';


const Registerfrom = () => {
    const Router = useRouter()
    const [username, Setusername] = useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,Setloading] = useState(false)
    const fromsubmit= async (e)=>{
        e.preventDefault()
        if(username === "")return toast.error("Name is required");
        if(email === "" )return toast.error("Email is required");
        if(password === "")return toast.error("Password is required");
        
        try {
            Setloading(true)
            await axios.post(`${DOMAIN}/api/users/register`, { email, password ,username})
            Router.replace("/")
            Setloading(false)
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
                placeholder='Enter Your Name' 
                type="text" 
                value={username} 
                onChange={(e) => Setusername(e.target.value)} 
            />
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
            <button type='submit' className='text-2xl rounded-md text-white bg-blue-800 p-2 font-bold'>
                {loading ? "loading...":"Register"}
            </button>
        </form>
    )
}

export default Registerfrom
