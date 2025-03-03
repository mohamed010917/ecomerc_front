"use client";

import {  useEffect ,useMemo,useState} from "react";
import Body from "./body";
import Edit from "./edit";
import Pagint from "./Pagnit";
import Search from "./search";

export default function Index(){
     const [data, setData] = useState([]);
    const [page, setpage] = useState(1);
    const [search, setsearch] = useState(null);
    const [meta, setmeta] = useState({});
    const [chang , setchang] = useState(false) ;


    useEffect( () => {
        let token = document.cookie.split("admin=")[1];
        let me = "GET"
        let api = `http://127.0.0.1:8000/api/proudects?page=${page}` ;
        if(search != null && search != ""){
            console.log(search)
            api = `http://127.0.0.1:8000/api/proudects/search?search=${search}` ;
            me = "POST"
        }
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
            if(search != null && search != ""){
            if (Array.isArray(responseData.data)) {
                
                setData(responseData.data);
                setmeta({});
            } else {
                console.error("Unexpected data format:", responseData);
            }

            }else{
            if (Array.isArray(responseData.data.data)) {
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




    return(
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                        <Search setsearch={setsearch}/>
                    </div>
                    <Body data={data} setchang ={setchang} chang={chang} />
                     <Pagint
                        setpage ={setpage}
                        page ={page}
                        meta ={meta}
                    />
                </div>
            </div>
    )
}