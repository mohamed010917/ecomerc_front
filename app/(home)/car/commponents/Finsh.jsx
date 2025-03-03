"use client";

import React, { useEffect, useState } from "react";
import Order from "./Order";


const Finsh = () => {
  const [data, setData] = useState([ ]);
  useEffect( () => {
    let token = document.cookie.split("user=")[1];
    
    if (!token) {
      console.log("User is not logged in, redirecting to login.");
      router.push("/login");
      return; // أوقف التنفيذ إذا لم يكن هناك توكن
    }
    let me = "POST"
    let api = `http://127.0.0.1:8000/api/order/finsh` ;

    fetch(api, {
      method: me,
      headers: { Authorization: `Bearer ${token}`,  "Content-Type": "application/json", },
      credentials: "include",
    })
      .then((response) => {
        console.log(response) ;
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error("Failed to fetch data");
          });
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.data) ;
        if (responseData.data) {
            setData(responseData.data) ;
          } else {
            console.error("Unexpected data format:", responseData);
          }
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
},[ ]);
  return (
    <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
      {data.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Finsh;