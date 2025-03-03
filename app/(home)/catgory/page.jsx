
"use client";

import  React, {  useEffect ,useMemo,useState} from "react";
import Ele from "../commponents/ele";
import Pagint from "./Pagnit";
import Search from "./search";
import Cat from "./components/Cat";
function page() {
      const [data, setData] = useState([]);
        const [page, setpage] = useState(1);
        const [search, setsearch] = useState(null);
        const [meta, setmeta] = useState({});
        const [chang , setchang] = useState(false) ;
        let me = "POST"
        useEffect( () => {
            let api = `http://127.0.0.1:8000/api/catgories?page=${page}` ;
            if(search != null && search != ""){
                api = `http://127.0.0.1:8000/api/catgories/search?search=${search}` ;
            }
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
                console.log(responseData) ;
                if(search != null && search != ""){
                if (responseData.data) {
                    setData(responseData.data);
                    setmeta({});
                } else {
                    console.error("Unexpected data format:", responseData);
                }
    
                }else{
                if (responseData.data.data) {
                    setData(responseData.data.data);
                    setmeta(responseData.data.meta);
                } else {
                    console.error("Unexpected data format:", responseData);
                }
                }
            })
            .catch((error) => {
        
                console.error("Error fetching data:", error);
            });
            console.log(data)
        },[page ,chang ,search ]);
    
  return (
    <div className="p-4 w-full  text-black dark:text-white">
        <h3 className="text-center text-2xl  m-6">All Catgories</h3>
    
      <Search setsearch={setsearch}/>
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

        <Pagint
                setpage ={setpage}
                page ={page}
                meta ={meta}
            />
        </div>
    </div>
  )
}

export default page