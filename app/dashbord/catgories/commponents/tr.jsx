"use client";
import { useState } from "react";
import Link from "next/link";


export default function Tr({data , setchang,  chang}){
    const [ e ,sete] = useState(false) ;
    function del(id){
        
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/catgory/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
          credentials: "include",
          body:JSON.stringify({_method : "delete"})

        })
          .then((response) => {
            console.log(response.json());
            if(! response.data ){
              sete(true);
              setTimeout(() => {
                sete(false) ;
              }, 4000);
            }else{
            setchang(! chang);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }
    return(
        <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">   
        <td className="px-6 py-4">{data.id}</td>
        <td className="px-6 py-4"><img className="w-10 h-10 rounded-full" src={data.img} alt="no" /></td>
        <td className="px-6 py-4">{data.name}</td>
        <td className="px-6 py-4">{data.description}</td>
        <td className="px-6 py-4">{data.status}</td>
        <td className="px-6 py-4">{
          data.parent ? data.parent.name : "NO"
        }</td>
        <td className="px-6 py-4">{data.sort}</td>
        <td className="px-6 py-4">{data.proudect_count}</td>
        <td className="px-6 py-4 flex gap-2">
          <button  onClick={() => document.getElementById(`editUserModal${data.id}`).classList.remove("hidden")}
           className="font-medium  text-blue-600 dark:text-blue-500 hover:underline">
            Edit 
          </button>
          <Link
            href={`/dashbord/catgories/${data.id}`}
           className="font-medium  text-green-600 dark:text-green-500 hover:underline">
            show 
          </Link>
          <button onClick={() => del(data.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">
            Delete
          </button>
          <div 
          className={`fixed top-10 left-10 z-50 px-6 py-4 bg-red-100 border border-red-400 text-red-700 rounded shadow-lg flex items-start ${e ? 'block' : 'hidden'}`}
          role="alert"
        >
          {/* يمكن إضافة أيقونة هنا */}
          <svg 
            className="w-6 h-6 mr-3 mt-1 text-red-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l6.518 11.598c.75 1.336-.213 3.003-1.723 3.003H3.462c-1.51 0-2.473-1.667-1.723-3.003L8.257 3.1zM9 13a1 1 0 112 0 1 1 0 01-2 0zm.25-4a.75.75 0 00-1.5 0v2a.75.75 0 001.5 0V9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-bold text-xl">Catgory Has proudect!</p>
            <p className="text-sm">You cannot delete this catgory. Please try again later.</p>
          </div>
        </div>
        </td>

      </tr>
    )
}