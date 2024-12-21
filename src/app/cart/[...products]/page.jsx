import React from 'react'

const page = ({params}) => {
  console.log(params)
  return (
    <div className='font-bold p-9 text-3xl' >
      products
      <ul>
        {params.products.map(route =>(
          <li key={route} >{route}</li>
        ))}
      </ul>
    </div>
  )
}

export default page
