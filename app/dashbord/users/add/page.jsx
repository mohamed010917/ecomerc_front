"use client";
import Link from "next/link";
import { useState , useEffect , useRef } from "react";
import { useRouter } from "next/navigation";
export default function page(){
  const [error, setError] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setError([]);
    }, 5000);
  },[error])
  const router = useRouter();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phone = useRef(null);
  const img = useRef(null);
  const address = useRef(null);
  const city = useRef(null);
  const country = useRef(null);
  async function  adddata(e){
    e.preventDefault();
    let token = document.cookie.split("admin=")[1];
    try {
      const formData = new FormData();
      formData.append("name", name.current.value);
      formData.append("email", email.current.value);
      formData.append("password", password.current.value);
      formData.append("phone", phone.current.value);
      formData.append("img", img.current.files[0]); // التعامل مع ملف الصورة
      formData.append("address", address.current.value);
      formData.append("city", city.current.value);
      formData.append("country", country.current.value);
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`},
        body: formData,
        credentials: "include",
      });
  
      if (!response.ok) {
        let error = await response.json() ;
        setError( Object.entries(error.errors)) ;
        return;
      }
  
      const data = await response.json();
      if (data) {
        router.push("/dashbord/users");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

    return (
    <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
    <div className="flex justify-between items-center">
        <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">add user</h1>
        <Link href={"/dashbord/users"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">all users</Link>
    </div>
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={adddata}  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Add New User
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              ref={name}
              type="text"
              id="name"
              placeholder="Enter name"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              ref={email}
              type="email"
              id="email"
              placeholder="Enter email"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Phone
            </label>
            <input
              ref={phone}
              type="text"
              id="phone"
              placeholder="Enter phone number"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          {/* Image URL Field */}
          <div>
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Image 
            </label>
            <input ref={img} className="block w-full text-sm text-gray-900 border border-gray-300 p-4 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
          </div>
          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Address
            </label>
            <input
              ref={address}
              type="text"
              id="address"
              placeholder="Enter address"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          {/* City Field */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              City
            </label>
            <input
              ref={city}
              type="text"
              id="city"
              placeholder="Enter city"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          {/* Country Field */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Country
            </label>
            <input
              ref={country}
              type="text"
              id="country"
              placeholder="Enter country"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-md focus:outline-none"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
    <div className="w-[50%] fixed top-4 left-4 ">
      {
        error.map((item , index) => {
          return (
          <div key={index} className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{item[1]}</span> 
         </div>
          )
      })
    }
   

    </div>
    </div>
    )
}