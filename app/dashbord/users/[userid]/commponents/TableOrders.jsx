"use client";
import { useState } from "react";
import Oreder from "./Oreder";
import AddOrder from "./addOrder";

export default function TableOrders({data , chang , SetChang , proudect}){
    const [add , setadd] = useState(false) ;
    let m ;
    let l ;
    if(Array.isArray(data.orders)){
        m = data.orders.map((e ,i)=>{
            return (
                <Oreder proudect={proudect} key={i} data={e} chang ={chang} SetChang ={SetChang}/>        )
        })
    }
    if(Array.isArray(data.finshes)){
        l = data.finshes.map((e ,i)=>{
            return (<Oreder proudect={proudect} key={i} data={e} chang ={chang} SetChang ={SetChang}/>)
        })
    }
  
    return(
        <div >
           <AddOrder add={add} id={data.id}  setadd={setadd}  chang={chang}  SetChang={SetChang}/>
            <div className="flex justify-between p-6 items-center">
                 <h1 className="p-4 text-2xl font-bold w-fit text-black dark:text-white">Orders</h1>
                <button onClick={() => setadd(true)} className="bg-green-600 p-2  rounded-md font-bold text-white">add order</button>
            </div>
            {
                m
            }
            <h1 className="m-auto p-4 text-2xl font-bold w-fit text-black dark:text-white">Finshe Order</h1>
            {
                l
            }
        </div>
    )
}