import React from 'react'
import Register from './Registerfrom'

const register = () => {

  return (
    <div className='m-auto p-7 flex justify-center items-center container'>
      <div className='bg-white p-5 w-full m-auto rounded-lg md:w-2/3'>
        <h1 className='text-gray-800 mb-5 font-bold text-3xl'>Create New Account</h1>
        <Register />
      </div>
    </div>
  )
}

export default register
