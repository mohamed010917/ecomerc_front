"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Reting from "./Reting";

const Ele = ({ e }) => {
  
  const router = useRouter();
  console.log(e) ;
  function add() {
    let token = document.cookie.split("user=")[1];
    if (!token) {
      router.push("/login");
      return;
    }
    fetch("http://127.0.0.1:8000/api/order/add", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        proudect_id: e.id,
        quantity: 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("error");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (

    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

            <img className="p-8 rounded-t-lg block h-[300px]" src={e.img ? e.img : "https://flowbite.com/docs/images/products/apple-watch.png"} alt={e.name} />

        <div className="px-5 pb-5">
      
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{e.name}</h5>
      
              <Reting rating={e.rating}/>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{e.price}$</span>
                <button onClick={add} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                <Link href={`/proudect/${e.id}`} onClick={add} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Show More</Link>
            </div>
        </div>
    </div>

  );
};

export default Ele;