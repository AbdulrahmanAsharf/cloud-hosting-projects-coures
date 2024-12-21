import Link from 'next/link'
import React from 'react'

const notfound = () => {
  return (
    <section className='flex justify-center items-center flex-col'>
      <h1 className='font-bold text-7xl text-gray-500'>404</h1>
      <p className='text-gray-500 mb-5 text-3xl'>Page Not Found</p>
      <Link className='text-blue-700 underline text-xl' href='/'>Go To Home Page</Link>
    </section>
  )
}

export default notfound
