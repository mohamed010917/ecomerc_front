"use client";

import { useRouter } from "next/navigation";
import Fotter from "../commponents/fotter"
import Nav from "../commponents/Nav"
import Cart from "./commponents/Cart"
import { useEffect, useState } from "react";
import Finsh from "./commponents/Finsh";

function page() {
    const [page , setPage] = useState("car") ;
    return(
        <div className="p-6 mb-6 border-gray-200 dark:border-gray-700">
            <div className="flex mt-4  mr-auto  ml-auto gap-2 w-[300px]">
                <button
                    onClick={() => setPage("car")}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                >
                    car
                </button>
                <button
                    onClick={() => setPage("finsh")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                >
                    Finsh order
                </button>
            </div>
            {
                page == "car" ? 
                <Cart />
                :
                <Finsh />
            }
        </div>
    )
}

export default page