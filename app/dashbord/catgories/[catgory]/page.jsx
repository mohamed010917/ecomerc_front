"use client";

import React, { useEffect, useState } from "react";
import Content from "./content"
import Proudect from "./proudect";
import Catgories from "./catgories";
import Link from "next/link";


export default function page({params}){
  const resolvedParams = React.use(params);
  const { catgory } = resolvedParams;
  const [chang , SetChang] =useState(true) ;
  const [data, setData] = useState([]);
    useEffect( () => {
        let token = document.cookie.split("admin=")[1];
        let me = "GET"
        let api = `http://127.0.0.1:8000/api/catgory/${catgory}` ;
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


    return (
        <>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Link href={"/dashbord/catgories"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">back</Link>
            <Content data={data}/>
            <Proudect data={data.proudect}/>
            <Catgories data={data.catgories}/>
        </div>
        </>
    )
  }