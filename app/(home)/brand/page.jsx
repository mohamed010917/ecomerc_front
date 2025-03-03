
"use client";

import  React, {  useEffect ,useMemo,useState} from "react";

import Cat from "./components/Cat";
function page() {
      const [data, setData] = useState(null);
        let me = "GET"
        useEffect( () => {
            let api = `http://127.0.0.1:8000/api/brand` ;
            fetch(api, {
            method: me,
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
              
                if (responseData.data) {
                    setData(responseData.data);
                } else {
                    console.error("Unexpected data format:", responseData);
                }
            })
            .catch((error) => {
        
                console.error("Error fetching data:", error);
            });
            console.log(data)
        },[]);
    if(data){
        console.log(data)

        return (
          <div className="p-4 w-full  text-black dark:text-white">
              <h3 className="text-center text-2xl  m-6">All Brands</h3>
          
      
              <div className="flex gap-6 justify-center items-center flex-wrap">
                  {
                      data.map((e)=>{
                          return(
                              <Cat e={e} key={e.id}/>
                          )
                      })
                  }
              </div>
              <div className="w-full text-center p-6 mt-4 mb-4 ">
      
              
              </div>
          </div>
        )

    }else{
        return (
            <div>       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div></div>
        )
    }
}

export default page