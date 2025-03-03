"use client";
import React, { useEffect, useRef, useState } from "react";


export default function AddOrder({add ,id, setadd , chang,  SetChang}){
    let [pram , setPram] = useState("");
    const [data ,setData] = useState({}) ;
    const [token, setToken] = useState(""); // تخزين التوكن في state

    useEffect(() => {
      if (typeof document !== "undefined") {
        const tokenValue = document.cookie.split("admin=")[1] || "";
        setToken(tokenValue);
      }
    }, []);
    function m(){
        let ele = document.getElementById("error") ;
        ele.classList.remove("hidden") ;
        setTimeout(() => { 
            ele.classList.add("hidden") ;
        }, 2000);
    }

    function save(e){
        e.preventDefault()
        let values = {...data , user_id : id}  ;
        console.log(values)
        let me = "post"
        let api = `http://127.0.0.1:8000/api/orders` ;
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}` , "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                m()
                console.log("API Error:", errorData);

              });
            }
            return response.json();
          })
          .then((responseData) => {
              if (responseData) {
                console.log("ok")
                setadd(false) ;
                SetChang(! chang) ;
              } else {
                m()
                console.log("Unexpected data format:", responseData);
              }
          })
          .catch((error) => {
            m()
            console.log("Error fetching data:", error);
          });
    }
    

    return(
        <>
        <div id="error" className="bg-red-700 hidden fixed top-10 left-10  p-4 rounded-md text-white">ther is some error plase try again</div>
        <div
        id={`editUserModaladd`}
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 ${add ? "flex" : "hidden"} left-0 right-0 z-50 items-center justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <form onSubmit={save} className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add order
              </h3>
              <button
                  onClick={() => setadd(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={`editUserModaladd`}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    status 
                  </label>
                    <select onChange={(e) => setData({...data ,status : e.target.value})} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="completed">completed</option>
                      <option value="decline">decline</option>
                      <option value="finsh">finsh</option>
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="payment_status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    payment status 
                  </label>
                    <select onChange={(e) => setData({...data ,payment_status : e.target.value})} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="payment_status" id="payment_status">
                      <option value="1">true</option>
                      <option value="0">false</option>
                    </select>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="delvery_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    delvery type 
                  </label>
                    <select onChange={(e) => setData({...data , delvery_type : e.target.value})} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="delvery_type" id="delvery_type">
                      <option value="home">home</option>
                      <option value="store">store</option>
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="payment_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                   payment type
                  </label>
                    <select onChange={(e) => setData({...data ,payment_method : e.target.value})} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="payment_type" id="payment_type">
                      <option value="paypal">paypal</option>
                      <option value="stripe">stripe</option>
                      <option value="cache">cache</option>
                    </select>
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
        </>
    )
}