import React from 'react'
import Ele from '../../commponents/ele'

function Proudect({data}) {
    console.log(data)
  return (
    <div className="p-4 w-full  text-black dark:text-white">
        <h3 className="text-center text-2xl  m-6">Proudct</h3>
        <div className="flex gap-6 justify-center items-center flex-wrap">
            {
                data.map((e)=>{
                    return(
                        <Ele e={e} key={e.id}/>
                    )
                })
            }
        </div>
        <div className="w-full text-center p-6 mt-4 mb-4 ">
    </div>
    </div>
  )
}

export default Proudect