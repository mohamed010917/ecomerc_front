"use client";

import React, { useEffect, useState } from "react";

const PaymentSummary = () => {
    const [data , setdata] = useState(null) ;
    useEffect( () => {
        let token = document.cookie.split("admin=")[1];
        let me = "GET"
        let api = `http://127.0.0.1:8000/api/pay/status` ;
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
            console.log(responseData) ;
                if (responseData.data) {
                setdata(responseData.data);

                } else {
                console.error("Unexpected data format:", responseData);
                }
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
            
    },[]);
    if(data){

        return (
          <div className="flex justify-between gap-4 overflow-x-auto p-4">
            {/* إجمالي المدفوعات */}
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-72 transition-transform duration-300 hover:scale-105">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Totle Pays</h2>
              <p className="text-4xl font-bold text-blue-500 my-2">{data.count}</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">{data.allMony} eg</p>
            </div>
            
            {/* مدفوعات الكاش */}
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-72 transition-transform duration-300 hover:scale-105">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200"> Cache</h2>
              <p className="text-4xl font-bold text-green-500 my-2">{data.cacheCount}</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">{data.cacheMony} Eg</p>
            </div>
            
            {/* مدفوعات الأونلاين */}
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-72 transition-transform duration-300 hover:scale-105">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200"> Online</h2>
              <p className="text-4xl font-bold text-purple-500 my-2">{data.onlineCount}</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">{data.onlineMony} Eg</p>
            </div>
          </div>
        );
    }else{
        return(
        <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        )
    }
};

export default PaymentSummary;
