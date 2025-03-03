"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Hamdauth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
      if (typeof document !== "undefined") {
          const userToken = document.cookie.split("user=")[1] || null;
          setToken(userToken);
      }
  }, []);
    async function logout(){
        let response = await fetch("http://127.0.0.1:8000/api/logout",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // إرسال التوكن
          },
            credentials: "include",
           
        });
        if (response.ok) {
          // حذف الكوكي بعد تسجيل الخروج
          document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.reload(); // تحديث الصفحة بعد تسجيل الخروج
        } else {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload(); 
          console.error("Logout failed");
        }
      }
  return (
    <div>
        {
            token ?
             <button className="bg-red-400 p-1  font-bold text-white rounded-lg" onClick={logout}>Logout</button>
             : 
             <div className='flex gap-2'>

                 <Link href={"/login"} className="bg-blue-600 p-1  font-bold text-white rounded-lg" >Login</Link>
                 <Link href={"/rejuster"} className="bg-green-600 p-1  font-bold text-white rounded-lg" >Rejuster</Link>
             </div>
        }
    </div>
  )
}

export default Hamdauth