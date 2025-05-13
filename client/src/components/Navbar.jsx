import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-14 px-32 bg-zinc-800 text-white'>
         <h1 className='text-2xl font-bold'>Code Snippet</h1>
         <button className='bg-blue-500 text-white px-4 py-2 rounded'>Logout</button>
    </div>
  )
}

export default Navbar