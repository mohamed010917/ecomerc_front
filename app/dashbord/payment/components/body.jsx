"use client";
import React, { useState } from "react";


import Tr from "./tr";
import Edit from "./edit";

export default function Body({data ,  setpage ,  setchang , chang  }){
    const [ed , seted] = useState({
      order_id: "",
      user_id: "",
       payment_status: "",
        amount: "" 
    }) ;
    const [open , setopen] = useState(false) ;
    return(
      <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              user
            </th>

            <th scope="col" className="px-6 py-3">
              payment_method
            </th>
            <th scope="col" className="px-6 py-3">
              payment_status
            </th>
            <th scope="col" className="px-6 py-3">
              order id
            </th>
            <th scope="col" className="px-6 py-3">
            amount
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>

        
        {data.map((data) => (
            <Tr 
            data={data} 
            setpage={setpage} 
            setchang={setchang}
            chang={chang}
            key={data.id}  
            seted={seted}
            open={open}
            setopen={setopen}
            />
          ))}
        </tbody>
      </table>
     
      <Edit
      chang={chang} 
      setchang={setchang}
      ed={ed}
      seted={seted}
      open={open}
      setopen={setopen}
       />
     
      </>
    )
}