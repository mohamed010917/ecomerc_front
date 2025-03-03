"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Checkout() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [payment, setpayment] = useState("");

    function checkout() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

     const hendlForm = async function(e){
         try {
        e.preventDefault();
        const token = document.cookie.split("user=")[1];
        if(payment == "cache"){
                const response = await fetch("http://127.0.0.1:8000/api/cache/pay", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ "delvery_type" : deliveryType }),
                  credentials: "include",
                });
          
                if (!response.ok) {
                  console.log("error")
                  return;
                }
          
                const data = await response.json();
                console.log(data)
                window.location.reload(); 
             
            }else{
                fetch(`http://127.0.0.1:8000/api/payment?delevry=${deliveryType}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then(response => response.json())
                  .then(data => {
                    console.log(data);
                    router.push(data.data) ;
                  })
                  .catch(e=>{
                    console.log("error") ;
                  })
                  ;
            }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
    return (
        <>
        <button
            onClick={checkout}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
        >
            Finish and Pay
        </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[400px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">
                        <button 
                            onClick={closeModal} 
                            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
                        >
                            &times;
                        </button>

                        <form onSubmit={hendlForm} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-bold text-gray-800 dark:text-white" htmlFor="delivery_type">
                                    Delivery Type
                                </label>
                                <select 
                                    className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    name="delivery_type" 
                                    id="delivery_type" 
                                    value={deliveryType}
                                    onChange={(e) => setDeliveryType(e.target.value)}
                                >
                                    <option value="">Select delivery type</option>
                                    <option value="home">Home</option>
                                    <option value="store">Store</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-bold text-gray-800 dark:text-white" htmlFor="payment_method">
                                payment method
                                </label>
                                <select 
                                    className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    name="payment_method" 
                                    id="payment_method" 
                                    value={payment}
                                    onChange={(e) => setpayment(e.target.value)}
                                >
                                    <option value="">Select payment Method</option>
                                    <option value="cache">Cache</option>
                                    <option value="pay">onine</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                            >
                                ok
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Checkout;
