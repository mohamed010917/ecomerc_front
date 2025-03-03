"use client";
import { useState } from "react";
import Link from "next/link";
import Edit from "./edit";
import Active from "./active";
import Isadmin from "./isadmin";

export default function Tr(props){
    const [ e ,sete] = useState(false) ;
    const user = props.user ;
   
    function del(id){
        
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/users/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
          credentials: "include",
          body:JSON.stringify({_method : "delete"})

        })
          .then((response) => {
         
            if (!response.ok) {
              console.log("error")
            }
            return response.json()
          }).then(response =>{
            console.log(response) ;
            if(! response.data ){
              sete(true);
              setTimeout(() => {
                sete(false) ;
              }, 4000);
            }else{
              props.setchang(! props.chang);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }
    return(
        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4"><img className="w-10 h-10 rounded-full" src={user.img} alt="no" /></td>
        <td className="px-6 py-4">{user.name}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.phone}</td>
        <td className="px-6 py-4"><Active id={user.id} active={user.status} setchang={props.setchang} chang={props.chang}/></td>
        <td className="px-6 py-4"><Isadmin id={user.id} is_admin={user.is_admin} setchang={props.setchang} chang={props.chang}/></td>
        <td className="px-6 py-4">{user.country}</td>
        <td className="px-6 py-4">{user.city}</td>
        <td className="px-6 py-4 flex gap-2">
          <button  onClick={() => document.getElementById(`editUserModal${user.id}`).classList.remove("hidden")}
           className="font-medium  text-blue-600 dark:text-blue-500 hover:underline">
            Edit 
          </button>
          <Link
            href={`/dashbord/users/${user.id}`}
           className="font-medium  text-green-600 dark:text-green-500 hover:underline">
            show 
          </Link>
          <button onClick={() => del(user.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">
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
            <p className="font-bold text-xl">User has orders and payments!</p>
            <p className="text-sm">You cannot delete this user. Please try again later.</p>
          </div>
        </div>
        </td>

      </tr>
    )
}