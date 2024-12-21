import React from 'react'
import { TiTick } from 'react-icons/ti'
const HostingPlan = () => {
    return (
    <div className='flex flex-col mb-7 md:w-2/4 lg:w-1/4 bg-gray-200 items-center justify-center rounded w-3/4'>
        <h3 className='font-bold text-purple-900 text-3xl'>Premim</h3>
        <strong className='fomt-bold text-3x1 my-5 text-gray-900'>$4.99/mo</strong>
        <span className='bg-red-200 text-red-900 rounded-full py-1 px-1 font-semibold'>10% OFF</span>
        <div className='mt-6'>
            <h5 className='text-2xl mb-1 font-semibold text-purple-700'>Top Features</h5>
            <div className='text-green-700 flex items-center mb-1 ps-3'>
                <TiTick /> 100 Website
            </div>
            <div className='text-green-700 flex items-center mb-1 ps-3'>
                <TiTick /> 100 CB SSD Storage
            </div>
            <div className='text-green-700 flex items-center mb-1 ps-3'>
                <TiTick /> Weekly Backups
            </div>
            <div className='text-green-700 flex items-center mb-1 ps-3'>
                <TiTick /> Unlimited BandWidth
            </div>
            <div className='text-green-700 flex items-center mb-1 ps-3'>
                <TiTick /> Free SLL
            </div>
            <div className='text-green-700 flex items-center mb-1 ps-3'>
                <TiTick /> Free Email
            </div>
        </div>
        <button className='w-11/12 border-2 m-4 border-gray-900 text-gray-900 text-2xl font-bold p-1 rounded-full hover:text-white hover:bg-gray-900 transition'>BUY NOW</button>
    </div>
    )
}

export default HostingPlan
