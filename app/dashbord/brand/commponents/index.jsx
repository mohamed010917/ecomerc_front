"use client";

import {  useEffect ,useState} from "react";
import Body from "./body";
import Search from "../../users/components/search";
import Pagint from "./Pagnit";
import Edit from "./edit";

export default function Index(){

     const [data, setData] = useState([]);
      const [chang , setchang] = useState(false) ;
      useEffect( () => {
          let token = document.cookie.split("admin=")[1];
          let me = "GET"
          let api = `http://127.0.0.1:8000/api/brands` ;
   
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
      },[chang ]);
    return(
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
    
            </div>
            <Body data={data} setchang ={setchang} chang={chang} />
        </div>
              {
                data.map((e ,index)=>{
                  return(
                    <Edit 
                    key={index} 
                    id={e.id}
                    data={e} 
                    chang  ={chang}
                    setchang  ={setchang}
                    />
                  )
                })
              }
      </div>
    )
}