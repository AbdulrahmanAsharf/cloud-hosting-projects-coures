"use client";
import { useState } from 'react';
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import  Updatecommentmodarl  from './Updatecommentmodarl'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';

const Commentitem = ({comment ,userId  }) => {
    const [open,Setopen]=useState(false)
    const router = useRouter()
    const handledelete = async () => {
        try{
            if(confirm("you want delete this comment Ara you sure")){
                await axios.delete(`${DOMAIN}/api/comments/${comment.id}`)
                router.refresh()
            }
            
        }catch(error){
            toast.error(error?.response?.data.message)
            console.error(error);
        }
        
    }
return (
    <div className='mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300'>
        <div className='flex items-center justify-between mb-2'>
            <strong className='text-gray-800 uppercase' >
                {comment.user.username}
            </strong>
            <span className='bg-yellow-700 px-1 rounded-lg text-white' >
                {new Date(comment.createAt).toDateString()}
            </span>
        </div>
        <p className='text-gray-800 mb-2' >
                {comment.text}
        </p>
        {userId && userId===comment.userId &&(
            <div className='flex justify-end items-center'>
                <FaEdit onClick={()=>Setopen(true)} className='text-green-600 text-xl cursor-pointer me-3' />
                <FaTrash onClick={(handledelete)} className='text-red-600 text-xl cursor-pointer' />
            </div>
        )}
        {open && <Updatecommentmodarl 
            Setopen={Setopen}
            text={comment.text}
            commentId={comment.id}
        />}
    </div>
)
}

export default Commentitem