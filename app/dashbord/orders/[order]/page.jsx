"use client";

import React, { useEffect, useState } from "react";
import Items from "./components/Items";
import  Content  from "./components/content";

export default function Page({params}){
    const resolvedParams = React.use(params);
    const { order } = resolvedParams;
      const [chang , SetChang] =useState(true) ;
      const [data, setData] = useState([]);
        useEffect( () => {
            let token = document.cookie.split("admin=")[1];
            let me = "GET"
            let api = `http://127.0.0.1:8000/api/orders/${order}` ;
            fetch(api, {
              method: me,
              headers: { Authorization: `Bearer ${token}` },
              credentials: "include",
            })
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((errorData) => {
                    console.error("API Error:", errorData);
                    throw new Error("Failed to fetch data");
                  });
                }
    
                return response.json();
              })
              .then((responseData) => {
                  if (responseData.data) {
                    console.log(responseData.data)
                    setData(responseData.data);
                  } else {
                    console.error("Unexpected data format:", responseData);
                  }
        
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
        },[chang]);
    return(
    <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <h1 className="w-fit m-auto text-black dark:text-white text-2xl mt-6 mb-6 font-bold">Informtion</h1>
        <Content data={data}/>
        <h1 className="w-fit m-auto text-black dark:text-white text-2xl mt-6 mb-6 font-bold">Items</h1>
        <Items 
        data={data.items} 
        SetChang={SetChang}
        chang={chang}
        />
    </div>
    )
}