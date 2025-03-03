"use client";
import Link from "next/link";
import { useState , useEffect , useRef } from "react";
import { useRouter } from "next/navigation";
export default function page(){
  const[data ,setData] = useState([]);

  const [error, setError] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setError([]);
    }, 10000);
  },[error])
  const router = useRouter();
  const img = useRef(null);
  const title = useRef(null);
  const description = useRef(null);
  const link = useRef(null);
  const status = useRef(null);
  const sort = useRef(null);
  const type = useRef(null);
 
  async function  adddata(e){
    e.preventDefault();
    let token = document.cookie.split("admin=")[1];
    try {
      const formData = new FormData();
      formData.append("title", title.current.value);
      formData.append("img", img.current.files[0]);
      formData.append("description", description.current.value);
      formData.append("status", status.current.value);
      formData.append("sort", sort.current.value);
      formData.append("link", link.current.value);
      formData.append("type", type.current.value);
      const response = await fetch("http://127.0.0.1:8000/api/baners", {
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
        router.push("/dashbord/baner");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

    return (
    <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
    <div className="flex justify-between items-center">
        <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">add Baner</h1>
        <Link href={"/dashbord/baner"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">all Baners</Link>
    </div>
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={adddata}  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Add New Baner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              title
            </label>
            <input
              ref={title}
              type="text"
              id="title"
              placeholder="Enter Title"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
      
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              link
            </label>
            <input
              ref={link}
              type="text"
              id="link"
              placeholder="Enter link"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              sort
            </label>
            <input
              ref={sort}
              type="number"
              id="sort"
              placeholder="Enter slug"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          <div >
            <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                status 
              </label>
                <select ref={status} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
            </div>
          <div >
            <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                type 
              </label>
                <select ref={type} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                  <option value="image">image</option>
                  <option value="text">text</option>
                          
                </select>
            </div>
          <div>
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Image 
            </label>
            <input ref={img} className="block w-full text-sm text-gray-900 border border-gray-300 p-4 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
 
          </div>
          <div>
            <label htmlFor="description">description</label>
            <textarea ref={description} className="border rounded-md p-2 outline-none focus:outline-none shadow-md " name="description" id="description" cols="70" rows="5"></textarea>
          </div>

       </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-md focus:outline-none"
          >
            Add Brand
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