"use client";
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {toast} from "react-toastify"
const AddCommentFrom = ({articleId}) => {
    const router = useRouter();
    const [text,setText]=useState("");

    const fromsubmit= async(e)=>{
        e.preventDefault()
        if(text === "") return toast.error("Please Write Something")

        try {
            await axios.post(`${DOMAIN}/api/comments`, {text, articleId})
            router.refresh()
            setText("");
        } catch (error) {
            toast.error(error?.response?.data.message)
            console.log(error)
        }
    }
    
    return (
        <form onSubmit={fromsubmit}>
            <input className='w-full p-2 text-xl rounded-lg bg-white focus:shadow-md' 
                type="text" 
                placeholder='Add a comment...'
                value={text}
                onChange={(e)=>setText(e.target.value)}
            />
            <button type="submit" className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition'>comment</button>
        </form>
    )
}

export default AddCommentFrom
