"use client";

import React, { useState } from "react";
import Items from "./items";
import AddItem from "./addItem";
import Updata from "./updata";
export default function Oreder({data , chang , SetChang , proudect}){
    const [action , setaction] = useState(false) ;
    const [show , setshow] = useState(false) ;
    const [ e ,sete] = useState(false) ;
    function del(){
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/orders/${data.id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
          credentials: "include",
          body:JSON.stringify({_method : "delete"})

        })
          .then((response) => {
            if (!response.ok) {
              console.log("error")
            }
            return response.json();
          })
          .then(response => {
            console.log(response) ;
            if(! response.data){
              sete(true);
              setTimeout(() => {
                sete(false) ;
              }, 4000);
            }else{
                SetChang(! chang) ;
                

            }
           
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }

    return(
        <div className="mt-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div 
            className={`bg-red-100 border fixed top-10 left-10 ${e ? 'block': 'hidden' }  border-red-400 text-red-700 px-4 py-3 rounded `}
            role="alert"
          >
            <strong className="font-bold text-2xl">this order have  payment you cant delete it try again</strong>

          </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    status
                </th>
                <th scope="col" className="px-6 py-3">
                    paymrnt method
                </th>
                <th scope="col" className="px-6 py-3">
                    payment status
                </th>
                <th scope="col" className="px-6 py-3">
                    delevery
                </th>
                <th scope="col" className="px-6 py-3">
                    price
                </th>
                <th scope="col" className="px-6 py-3">
                    action
                </th>
                </tr>
            </thead>
            <tbody>
                <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{data.id}</td>
                    <td className="px-6 py-4">{data.status}</td>
                    <td className="px-6 py-4">{data.payment_method}</td>
                    <td className="px-6 py-4">{data.payment_status}</td>
                    <td className="px-6 py-4">{data.delvery_type}</td>
                    <td className="px-6 py-4">{data.price}</td>
                    <td className="px-6 py-4 flex gap-2">
                        <button className="bg-red-500 rounded-md p-2 cursor-pointer text-white " onClick={del}>Delete</button>
                        <button className="bg-green-600 rounded-md p-2 cursor-pointer text-white " onClick={() => setaction(true)}>Add Items</button>
                        <button className="bg-blue-600 rounded-md p-2 cursor-pointer text-white " onClick={() => setshow(true)}>updata</button>
                    </td>
                </tr>
            </tbody>
            </table>
            <Items data={data.items  } SetChang ={SetChang} chang={chang} />
            <AddItem proudect={proudect} action={action} setaction={setaction} id={data.id} chang ={chang} SetChang={SetChang} />
            <Updata show={show} setshow={setshow} order={data} chang={chang} SetChang={SetChang} />
        </div>
    )
}