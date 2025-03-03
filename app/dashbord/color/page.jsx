"use client";

import {  useEffect ,useState} from "react";
import Link from "next/link";
import Table from "./commponents/table";
import Edit from "./commponents/edit";

export default function Page(){
    const [data, setData] = useState([]);
    const [chang , setchang] = useState(false) ;
    useEffect( () => {
        let token = document.cookie.split("admin=")[1];
        let me = "GET"
        let api = `http://127.0.0.1:8000/api/colors` ;
        
        fetch(api, {
          method: me,
          headers: { Authorization: `Bearer ${token}` },
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
          .then((responseData) => {           
              if (Array.isArray(responseData.data)) {
                setData(responseData.data);
              } else {
                console.error("Unexpected data format:", responseData);
              }
            
          })
          .catch((error) => {
     
            console.error("Error fetching data:", error);
          });
          console.log(data)
    },[chang]);
   
    return(
        <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
        <div className="flex justify-between items-center">
          <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">colors</h1>
            <button onClick={() => document.getElementById(`editUserModalcolor`).classList.remove("hidden")}  className="p-2 font-bold bg-blue-700 text-white rounded-md ">add color</button>
        </div>
            <Table data={data} chang ={chang} setchang ={setchang} />
            <Edit  chang ={chang} setchang ={setchang} />
        </div>
    )
}