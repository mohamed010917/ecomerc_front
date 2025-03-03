"use client";

import React, { useEffect, useState } from "react";
import Search from "./search";
import Body from "./body";
import Pagint from "./Pagnit";
import AddOrder from "./addOrder";
import Edit from "./edit";

export default function Table(){
    const [data, setData] = useState([]);
    const [users, setusers] = useState([]);
    const [page, setpage] = useState(1);
    const [search, setsearch] = useState(null);
    const [meta, setmeta] = useState({});
    const [chang , setchang] = useState(false) ;
    const [add , setadd] = useState(false) ;
    const [usersearch , setusersearch] = useState("") ;
    useEffect( () => {
        let token = document.cookie.split("admin=")[1];
        let me = "GET"
        let api = `http://127.0.0.1:8000/api/orders?page=${page}` ;
        if(search ){
           api = `http://127.0.0.1:8000/api/orders/search?search=${search}` ;
           me = "POST"
        }
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {  
                throw new Error("Failed to fetch data");
              });
            }
            return response.json();
          })
          .then((responseData) => {
            console.log(responseData) ;
            if(search != null && search != ""){
              if (Array.isArray(responseData.data)) {
                setData(responseData.data);
                setmeta({});
              } else {
                console.error("Unexpected data format:", responseData);
              }
  
            }else{
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
         
    },[page ,chang ,search ]);
    //all users
    useEffect( () => {
        let token = document.cookie.split("admin=")[1];
       // all users
       fetch(`http://127.0.0.1:8000/api/users/search?search=${usersearch}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error("Failed to fetch data");
            });
          }
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData) ;
            if (Array.isArray(responseData.data)) {
              setusers(responseData.data);
            } else {
              console.error("Unexpected data format:", responseData);
            }

          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },[usersearch]);
  
    return(
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
      <button onClick={() => setadd(true)} className="bg-green-600 p-2  rounded-md font-bold text-white">add order</button>
         <AddOrder add={add} id={data.id}  setadd={setadd}  chang={chang}  setchang={setchang} users={users} usersearch={usersearch} setusersearch={setusersearch}/>
       
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
      {
        data.map((data ,index)=>{
          return(
            <Edit 
                chang ={chang}
                setchang ={setchang}
                key={data.id} 
                data={data}
                users={users} 
                usersearch={usersearch} 
                setusersearch={setusersearch}
               />
          )
        })
      }

    </div>

    )
}