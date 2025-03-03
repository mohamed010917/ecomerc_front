"use client";
import Link from "next/link";
import { useState , useEffect , useRef } from "react";
import { useRouter } from "next/navigation";
export default function page(){
  const[data ,setData] = useState([]);
  useEffect( () => {
    let token = document.cookie.split("admin=")[1];
    let me = "POST"
    let api = `http://127.0.0.1:8000/api/catgory/all` ;
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

},[]);
  const [error, setError] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setError([]);
    }, 10000);
  },[error])
  const router = useRouter();
  const name = useRef(null);
  const img = useRef(null);
  const description = useRef(null);
  const status = useRef(null);
  const parent_id = useRef(null);
  const meta_title = useRef(null);
  const meta_description = useRef(null);
  const sort = useRef(null);
  const slug = useRef(null);
  async function  adddata(e){
    e.preventDefault();
    let token = document.cookie.split("admin=")[1];
    try {
      const formData = new FormData();
      formData.append("name", name.current.value);
      formData.append("img", img.current.files[0]);
      formData.append("description", description.current.value);
      formData.append("status", status.current.value);
      formData.append("parent_id", parent_id.current.value); // التعامل مع ملف الصورة
      formData.append("meta_title", meta_title.current.value);
      formData.append("meta_description", meta_description.current.value);
      formData.append("sort", sort.current.value);
      formData.append("slug", slug.current.value);
      const response = await fetch("http://127.0.0.1:8000/api/catgory", {
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
        router.push("/dashbord/catgories");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

    return (
    <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
    <div className="flex justify-between items-center">
        <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">add catgory</h1>
        <Link href={"/dashbord/catgories"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">all catgory</Link>
    </div>
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={adddata}  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Add New catgory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              meta title
            </label>
            <input
              ref={meta_title}
              type="text"
              id="meta_title"
              placeholder="Enter titel"
              className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              slug
            </label>
            <input
              ref={slug}
              type="text"
              id="slug"
              placeholder="Enter slug"
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
                parent Catgory 
              </label>
                <select ref={parent_id} className="w-full p-2 bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                  <option value="">no</option>
                  {
                    data.map(e=>{
                      return(
                        <option key={e.id} value={e.id}>{e.name}</option>
                      )
                    })
                  }
                 
                </select>
            </div>


          <div>
            <label htmlFor="description">description</label>
            <textarea ref={description} className="border rounded-md p-2 outline-none focus:outline-none shadow-md " name="description" id="description" cols="30" rows="10"></textarea>
          </div>
          <div>
            <label htmlFor="meta_description">meta description</label>
            <textarea ref={meta_description} className="border rounded-md p-2 outline-none focus:outline-none shadow-md " name="meta_description" id="meta_description" cols="30" rows="10"></textarea>
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


       </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-md focus:outline-none"
          >
            Add Catgory
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