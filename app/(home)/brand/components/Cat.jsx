import Link from 'next/link'
import React from 'react'

function Cat({e}) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <Link href={`brand/${e.id}`}>
            <img className="p-8 rounded-t-lg" src={e.img ? e.img : "https://flowbite.com/docs/images/products/apple-watch.png"} alt={e.name} />
        </Link>
        <div className="px-5 pb-5">
            <div className='p-2 mb-4'> 
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{e.name}</h5>
            </div>
            
                
            <div className="flex items-center justify-between">
               
                <Link href={`/brand/${e.id}`}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Show More</Link>
            </div>
        </div>
    </div>
  )
}

export default Cat