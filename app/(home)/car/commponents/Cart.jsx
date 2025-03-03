"use client";


import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Checout from "./Checout";

function Cart() {
   const router = useRouter();
    const [cart, setCart] = useState([ ]);
    const [data, setData] = useState([ ]);
    const [chang , setchang] = useState(false) ;
    useEffect( () => {
      let token = document.cookie.split("user=")[1];
      
      if (!token) {
        console.log("User is not logged in, redirecting to login.");
        router.push("/login");
        return; // أوقف التنفيذ إذا لم يكن هناك توكن
      }
      let me = "POST"
      let api = `http://127.0.0.1:8000/api/order/all` ;

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
            console.log(responseData) ;
            if (responseData.data) {
              setCart(responseData.data);
              setData(responseData.data.items) ;
            } else {
              console.error("Unexpected data format:", responseData);
            }
          
        })
        .catch((error) => {
   
          console.error("Error fetching data:", error);
        });
       setData(cart.items) ;
  },[chang  ]);
      const incrementQuantity = (id) => {
        let token = document.cookie.split("user=")[1];
      
        if (!token) {
          console.log("User is not logged in, redirecting to login.");
          router.push("/login");
          return; // أوقف التنفيذ إذا لم يكن هناك توكن
        }
        let me = "POST"
        let api = `http://127.0.0.1:8000/api/order/increment/${id}` ;
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}`,  "Content-Type": "application/json", },
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
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
         setchang(! chang) ;
      };
    
      // نقصان كمية المنتج (بحد أدنى 1)
      const decrementQuantity = (id) => {
        let token = document.cookie.split("user=")[1];
      
        if (!token) {
          console.log("User is not logged in, redirecting to login.");
          router.push("/login");
          return; // أوقف التنفيذ إذا لم يكن هناك توكن
        }
        let me = "POST"
        let api = `http://127.0.0.1:8000/api/order/decrement/${id}` ;
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}`,  "Content-Type": "application/json", },
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
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
         setchang(! chang) ;
      };
    
      // حذف المنتج من العربة
      const removeItem = (id) => {
        let token = document.cookie.split("user=")[1];
      
        if (!token) {
          console.log("User is not logged in, redirecting to login.");
          router.push("/login");
          return; // أوقف التنفيذ إذا لم يكن هناك توكن
        }
        let me = "POST"
        let api = `http://127.0.0.1:8000/api/order/del/${id}` ;
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}`,  "Content-Type": "application/json", },
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
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
         setchang(! chang) ;
      };
    

  
      let e ;
        if(data){
           e =(
            <div className="space-y-4">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b  pb-4"
                 >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.proudect.img ? item.proudect.img 
                        : "https://flowbite.com/docs/images/products/apple-watch.png" }
                      alt={item.proudect.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {item.proudect.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-gray-800 dark:text-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )
        }else{
          e = (
            <p className="text-gray-600 ">no order now you can chose any proudect</p>
          ) 
        }
        return (
          <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                car
              </h1>
              {e}

              {
                cart.price ? 
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Totle: ${cart.price.toFixed(2)}
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  shaping cost: 35 egp
                </p>
          
                <Checout />
              </div>
                :
                <div></div>
              }
      
             
            </div>
          </div>
        );
}

export default Cart