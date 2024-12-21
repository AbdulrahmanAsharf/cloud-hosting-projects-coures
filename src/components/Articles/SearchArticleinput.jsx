"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const SearchArticleinput = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");

    const fromsubmit=(e)=>{
        e.preventDefault()
        console.log({ searchText });
        router.push(`/articles/search?searchText=${searchText}`);
    }
    
    return (
        <form onSubmit={fromsubmit} className='my-5 w-fll md:w-2/3 m-auto'>
            <input className='w-full p-3 border-none mb-4 text-xl rounded text-gray-900' 
                type="search" 
                placeholder="Search for article"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    )
}

export default SearchArticleinput
