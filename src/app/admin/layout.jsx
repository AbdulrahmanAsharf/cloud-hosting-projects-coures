import React from 'react'
import Sideber from './Sideber'





const Layout = ({children}) => {
  return (
    <div className='flex overflow-height justify-between items-start overflow-hidden'>
      <div className='p-1 overflow-height lg:p-5 w-16 lg:w-1/5 bg-purple-600 text-white'>
        <Sideber />
      </div>
      <div className='w-full overflow-height lg:w-4/5 overflow-y-scroll'>
        {children}
      </div>
    </div>
  )
}

export default Layout

