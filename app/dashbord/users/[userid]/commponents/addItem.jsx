"use client";
import React, { useEffect, useRef, useState } from "react";
export default function AddItem({action , setaction,  id, chang,  SetChang , proudect}){
  
    const [data ,setData] = useState({order_id : id}) ;
    let [pram , setPram] = useState("");
    let token = document.cookie.split("admin=")[1];
    
    function m(){
        let ele = document.getElementById("error") ;
        ele.classList.remove("hidden") ;
        setTimeout(() => {
            
            ele.classList.add("hidden") ;
        }, 2000);
    }


    function save(e){
        e.preventDefault()
        console.log(data)
        let me = "post"
        let api = `http://127.0.0.1:8000/api/items` ;
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}` , "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
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
              if (responseData.data) {
                console.log("ok")
                setaction(false) ;
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

    if(proudect){
      return(
          <>
          <div id="error" className="bg-red-700 hidden fixed top-10 left-10  p-4 rounded-md text-white">ther is some error plase try again</div>
          <div
          id={`editUserModal${id}`}
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed top-0 ${action ? "flex" : "hidden"} left-0 right-0 z-50 items-center justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <form onSubmit={save} className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add item
                </h3>
                <button
                    onClick={() => setaction(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide={`editUserModal${id}`}
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
                      
                      <select onChange={(e) => setData({...data ,proudect_id : e.target.value})} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="proudect_id" id="pr">
                          {
                              proudect.map(e=>{
                                  return (   <option value={e.id} key={e.id}>{e.name}</option>)
                              })
                          }
                      </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      quantity 
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      onChange={(e) => setData({...data ,quantity : e.target.value})}
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="quantity"
                      required
                    />
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
}