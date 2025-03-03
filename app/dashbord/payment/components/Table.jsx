
"use client";
import React, { useEffect, useState } from 'react'
import Body from './body';
import Pagint from './Pagnit';
import AddItem from './addItem';
import Search from './search';

function Table() {
const [data, setData] = useState([]);
const [users, setusers] = useState([]);
const [page, setpage] = useState(1);
const [search, setsearch] = useState(null);
const [meta, setmeta] = useState({});
const [chang , setchang] = useState(false) ;
const [add , setadd] = useState(false) ;
const [action , setAction] = useState(false) ;
useEffect( () => {
    let token = document.cookie.split("admin=")[1];
    let me = "GET"
    let api ;
    if(search != null && search != ""){
         api = `http://127.0.0.1:8000/api/pay/search?search=${search}` ;
    }else{
         api = `http://127.0.0.1:8000/api/pays?page=${page}` ;
    }
    fetch(api, {
        method: me,
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
    })
        .then((response) => {
        if (!response.ok) {
            return response.json().then((errorData) => {
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            throw new Error("Failed to fetch data");
            });
        }
        return response.json();
        })
        .then((responseData) => {
            if(search != null && search != ""){
                if (Array.isArray(responseData.data)) {
                  setData(responseData.data);
                  setmeta({});
                } else {
                  console.error("Unexpected data format: search :", responseData);
                }
            }else{
                console.log(responseData) 
                if (Array.isArray(responseData.data.data)) {
                
                setData(responseData.data.data);
                setmeta(responseData.data.meta);
                } else {
                console.error("Unexpected data format:", responseData);
                }      

            }
        })
        .catch((error) => {
        console.error("Error fetching data:", error);
        });
        
},[page ,chang , search  ]);
  if(data){
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            <button onClick={() => setAction(true)} className="bg-green-600 p-2  rounded-md font-bold text-white">add Payment</button>
              <AddItem 
              action ={action}
              setAction  ={setAction}
              chang={chang}  
              setchang={setchang}  
              />
       
              <Search setsearch={setsearch}/>
            </div>
            <Body
            data ={data}
            setpage ={setpage}
            setchang ={setchang}
            chang ={chang}
            />
            <Pagint 
            setpage ={setpage}
            page ={page}
            meta ={meta}
            />
  
      
          </div>
    )
  }else{
    return(
    <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
    )
}
}

export default Table