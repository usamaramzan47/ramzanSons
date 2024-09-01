import React from 'react'

function Notifications() {
  return (
    <div className='flex flex-col gap-3'>
      <div className="title flex items-center justify-between">
        <span className='font-semibold text-14'>Notifications</span>
        <a href="/" className='text-[blue] text-12'>View All</a>
      </div>
      <div className="cell bg-[#f9f9f9] w-full h-10 p-2 rounded-md"></div>
      <div className="cell bg-[#f9f9f9] w-full h-10 p-2 rounded-md"></div>
      <div className="cell bg-[#f9f9f9] w-full h-10 p-2 rounded-md"></div>
      <div className="cell bg-[#f9f9f9] w-full h-10 p-2 rounded-md"></div>
      <div className="cell bg-[#f9f9f9] w-full h-10 p-2 rounded-md"></div>
    </div>
  )
}

export default Notifications
