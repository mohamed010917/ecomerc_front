"use client";
import Link from "next/link";
import React, { useState ,useEffect, useRef, useMemo} from "react"
import { useRouter } from "next/navigation";
export default function page({params}){
    const[catgory ,setcatgory] = useState([]);
    const[colors ,setcolors] = useState([]);
    const[brand ,setbrand] = useState([]);
    const [refrens , setrefrens] = useState({})
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
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
                setcatgory(responseData.data);
        
                } else {
                console.error("Unexpected data format:", responseData);
                }
            
            })
            .catch((error) => {
        
            console.error("Error fetching data:", error);
            });
            // all colors
        fetch("http://127.0.0.1:8000/api/colors", {
            method: "GET",
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
                setcolors(responseData.data);
        
                } else {
                console.error("Unexpected data format:", responseData);
                }
            
            })
            .catch((error) => {
        
            console.error("Error fetching data:", error);
            });

            // brands
        fetch(`http://127.0.0.1:8000/api/brands` , {
            method: "GET",
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
                console.log(responseData)
                if (Array.isArray(responseData.data)) {
   
                    setbrand(responseData.data);
        
                } else {
                console.error("Unexpected data format:", responseData);
                }
            
            })
            .catch((error) => {
        
            console.error("Error fetching data:", error);
            });
            // data
        fetch(`http://127.0.0.1:8000/api/proudects/${id}` , {
            method: "GET",
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
                
                if (responseData.data) {
                    console.log(responseData.data)
                    setrefrens(responseData.data);
        
                } else {
                console.error("Unexpected data format:", responseData);
                }
            
            })
            .catch((error) => {
        
            console.error("Error fetching data:", error);
            });
    
    },[]);
  const img = useRef(null)
   const [error, setError] = useState([]);
    useEffect(() => {
      setTimeout(() => {
        setError([]);
      }, 20000);
    },[error])
  

    async function  adddata(e){
    
      e.preventDefault();
      let token = document.cookie.split("admin=")[1];
      const formData = new FormData();
      try {
        if(img.current.files[0]){
            formData.append("img", img.current.files[0]);
        }
        formData.append("name",refrens.name );
        formData.append("description", refrens.description);
        formData.append("short_description", refrens.short_description);
        formData.append("catgory_id", refrens.catgory_id  ); // التعامل مع ملف الصورة
        formData.append("color_id", refrens.color_id);
        formData.append("brand_id", refrens.brand_id);
        formData.append("status", refrens.status);
        formData.append("meta_title", refrens.meta_title);
        formData.append("meta_description", refrens.meta_description);
        formData.append("price", refrens.price ); // التعامل مع ملف الصورة
        formData.append("discount", refrens.discount);
        formData.append("quantity", refrens.quantity);
        formData.append("sort", refrens.sort);
        formData.append("slug", refrens.slug);
        formData.append("_method", "PUT");

        const response = await fetch(`http://127.0.0.1:8000/api/proudects/${refrens.id}`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`},
          body: formData,
          credentials: "include",
        });
        if (!response.ok) {
            console.log("in not ok")
          let error = await response.json() ;
          setError( Object.entries(error.errors)) ;
          return;
        }
        if (response.ok) {
            console.log("in  ok")
            router.push("/dashbord/proudects");
        }
 
      } catch (error) {
        console.log("in catch")
        setError( Object.entries(error.errors)) ;
        console.error("Error fetching data:", error);
      }
    }
    
       if(refrens.name){
           return(
               <>
               <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
               <div className="flex justify-between items-center">
                   <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">edit proudect</h1>
                   <Link href={"/dashbord/proudects"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">all proudec</Link>
               </div>
               <div className="max-w-3xl mx-auto p-6">
                   <form onSubmit={(e) => adddata(e)} className="relative p-4 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                   
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                           <label
                           htmlFor="name"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                           >
                           Name
                           </label>
                           <input
                           onChange={(e) => setrefrens({...refrens , name : e.target.value})}
                           value={refrens.name}
                           type="text"
                           id="name"
                           placeholder="Enter name"
                           className="w-full py-3 px-4 rounded-md order-1 dark:text-white bg-gray-100 dark:bg-gray-500 focus:outline-none transition-all"
                           />
                       </div>
                       <div>
                           <label
                           htmlFor="name"
                           className="block text-sm font-medium dark:text-white   mb-2"
                           >
                           meta title
                           </label>
                           <input
                               onChange={(e) => setrefrens({...refrens , meta_title : e.target.value})}
                               value={refrens.meta_title}
                           type="text"
                           id="meta_title"
                           placeholder="Enter titel"
                           className="w-full py-3 px-4 rounded-md  bg-gray-100 dark:bg-gray-500 dark:text-gray-300  dark:text-white focus:outline-none transition-all"
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
                               onChange={(e) => setrefrens({...refrens , slug : e.target.value})}
                               value={refrens.slug}
                           type="text"
                           id="slug"
                           placeholder="Enter slug"
                           className="w-full py-3 px-4 rounded-md  dark:text-white bg-gray-100 dark:bg-gray-500 focus:outline-none transition-all"
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
                           onChange={(e) => setrefrens({...refrens , sort : e.target.value})}
                           value={refrens.sort}
                           type="number"
                           id="sort"
                           placeholder="Enter sort"
                           className="w-full py-3 px-4 dark:text-white  dark:bg-gray-500 rounded-md bg-gray-100 focus:outline-none transition-all"
                           />
                       </div>
                       <div>
                           <label
                           htmlFor="price"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                           >
                           price
                           </label>
                           <input
                           onChange={(e) => setrefrens({...refrens , price : e.target.value})}
                           value={refrens.price}
                           type="number"
                           id="price"
                           placeholder="Enter price"
                           className="w-full py-3 px-4 dark:text-white  dark:bg-gray-500 rounded-md bg-gray-100 focus:outline-none transition-all"
                           />
                       </div>
                       <div>
                           <label
                           htmlFor="discount"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                           >
                           discount
                           </label>
                           <input
                           onChange={(e) => setrefrens({...refrens , discount : e.target.value})}
                           value={refrens.discount}
                           type="number"
                           id="discount"
                           placeholder="Enter discount"
                           className="w-full py-3 px-4 dark:text-white  dark:bg-gray-500 rounded-md bg-gray-100 focus:outline-none transition-all"
                           />
                       </div>
                       <div>
                           <label
                           htmlFor="quantity"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                           >
                           quantity
                           </label>
                           <input
                           onChange={(e) => setrefrens({...refrens , quantity : e.target.value})}
                           value={refrens.quantity}
                           type="number"
                           id="quantity"
                           placeholder="Enter quantity"
                           className="w-full py-3 px-4 dark:text-white  dark:bg-gray-500 rounded-md bg-gray-100 focus:outline-none transition-all"
                           />
                       </div>
                       <div >
                           <label
                               htmlFor="status"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                               status 
                           </label>
                               <select         
                               onChange={(e) => setrefrens({...refrens , status : e.target.value})}
                               value={refrens.status}
                           className="w-full p-2 bg-white dark:text-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                               <option   value="active">active</option>
                               <option   value="inactive">inactive</option>
                               </select>
                           </div>
                       <div >
                           <label
                               htmlFor="status"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                               Catgory 
                           </label>
                               <select
                               onChange={(e) => setrefrens({...refrens , catgory_id : e.target.value})}
                               value={refrens.catgory_id ? refrens.catgory_id : ""}
                               className="w-full p-2 dark:text-white bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                               <option value="">no</option>
                               {
                                   catgory.map(e=>{
                                   return(
                                       <option key={e.id} value={e.id}>{e.name}</option>
                                   )
                                   })
                               }
                               
                               </select>
                       </div>
                       <div >
                           <label
                               htmlFor="status"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                               color 
                           </label>
                               <select
                               onChange={(e) => setrefrens({...refrens , color_id : e.target.value})}
                               value={refrens.color_id ? refrens.color_id:""}
                               className="w-full p-2 dark:text-white bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                               <option value="">no</option>
                               {
                                   colors.map(e=>{
                                   return(
                                       <option key={e.id} value={e.id}>{e.name}</option>
                                   )
                                   })
                               }
                               
                               </select>
                       </div>
                       <div >
                           <label
                               htmlFor="status"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                               Brand 
                           </label>
                               <select
                               onChange={(e) => setrefrens({...refrens , brand_id : e.target.value})}
                               value={refrens.brand_id ? refrens.brand_id :""}
                               className="w-full p-2 dark:text-white bg-white dark:bg-gray-600 border rounded-md" name="status" id="status">
                               <option value="">no</option>
                               {
                                   brand.map(e=>{
                                   return(
                                       <option key={e.id} value={e.id}>{e.name}</option>
                                   )
                                   })
                               }
                               
                               </select>
                       </div>
       
       
                       <div>
                           <label htmlFor="description" className="dark:text-white">description</label>
                           <textarea 
                               onChange={(e) => setrefrens({...refrens , description : e.target.value})}
                               value={refrens.description ? refrens.description :"" }
                           className="border rounded-md p-2 outline-none dark:bg-gray-600 text-black dark:text-white focus:outline-none shadow-md " name="description" id="description" cols="30" rows="10"></textarea>
                       </div>
                       <div>
                           <label htmlFor="short_description" className="dark:text-white">description</label>
                           <textarea 
                               onChange={(e) => setrefrens({...refrens , short_description : e.target.value})}
                               value={refrens.short_description ? refrens.short_description :"" }
                           className="border bg-white dark:bg-gray-600 text-black dark:text-white rounded-md p-2 outline-none focus:outline-none shadow-md " name="description" id="description" cols="30" rows="10"></textarea>
                       </div>
                       <div>
                           <label htmlFor="meta_description" className="dark:text-white">meta description</label>
                           <textarea 
                               onChange={(e) => setrefrens({...refrens , meta_description : e.target.value})}
                               value={refrens.meta_description ? refrens.meta_description :"" }
                                   className="border rounded-md dark:bg-gray-600 text-black dark:text-white p-2 outline-none focus:outline-none shadow-md " name="meta_description" id="meta_description" cols="30" rows="10"></textarea>
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
               
                       {/* Modal footer */}
                       <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                       <button
                           type="submit"
                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                       >
                           Save all
                       </button>
                       </div>
                   </form>
                   </div>
                   <div className="fixed text-2xl font-bold top-10 left-10 ">
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
               </>
       
           
           )
       } 
       return (<div>       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div></div>)
}