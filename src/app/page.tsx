import React from 'react'
import Hero from '@/components/home/Hero'
import HopstingPlan from '@/components/home/HostingPlan'
const page = () => {
  return (
    <section>
      <Hero />
      <h2 className='text-center mt-10 font-bold text-3xl'>Choose Your Hosting Plan</h2>
      <div className='m-auto container flex justify-center items-center my-7 flex-wrap md:gap-7'>
      <HopstingPlan />
      <HopstingPlan />
      <HopstingPlan />
      </div>
    </section>
  )
}

export default page
