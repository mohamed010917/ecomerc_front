"use client";

import React, { useEffect, useState } from "react";
import Conttent from "./commponents/conttent";
import TableOrders from "./commponents/TableOrders";
import Review from "./commponents/Review";

export default function page({params}){
  const resolvedParams = React.use(params);
  const { userid } = resolvedParams;
  const [chang , SetChang] =useState(true) ;
  const [proudect , setproudect ] = useState() ;
  const [data, setData] = useState([]);
  const [token, setToken] = useState(""); // تخزين التوكن في state

  useEffect(() => {
    if (typeof document !== "undefined") {
      const tokenValue = document.cookie.split("admin=")[1] || "";
      setToken(tokenValue);
    }
  }, []);
    useEffect( () => {
      if (!token) return;
        let me = "GET"
        let api = `http://127.0.0.1:8000/api/users/${userid}` ;
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
    },[chang , token]);

    useEffect( () => {
      if (!token) return;
        let me = "post"
        let pram = "" ;
        let api = `http://127.0.0.1:8000/api/proudects/search` ;
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}` , "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ pram }),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                console.log("API Error:", errorData);
               
              });
            }
            return response.json();
          })
          .then((responseData) => {
              if (responseData.data) {
                setproudect(responseData.data);
              } else {
                console.log("Unexpected data format:", responseData);
              }
    
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
    },[token]);

    return (
        <>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
          <Conttent data={data}/>
          <TableOrders proudect={proudect} data={data} chang ={chang} SetChang ={SetChang}/>
          <Review data={data} chang ={chang} SetChang ={SetChang}/>
        </div>
        </>
    )
  }