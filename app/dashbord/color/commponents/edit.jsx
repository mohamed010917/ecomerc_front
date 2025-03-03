"use client";
import { useState ,useEffect, useRef} from "react"

export default function Edit({setchang,chang}){
    const [error, setError] = useState([]);
    useEffect(() => {
      setTimeout(() => {
        setError([]);
      }, 20000);
    },[error])
    const [refrens , setrefrens] = useState({});
    async function  adddata(e){
        console.log(refrens) ;
        e.preventDefault();
        let token = document.cookie.split("admin=")[1];
      
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/colors`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` , "Content-Type": "application/json"},
            body: JSON.stringify(refrens) ,
            credentials: "include",
          });
          if (!response.ok) {
            let error = await response.json() ;
            setError( Object.entries(error.errors)) ;
            return;
          }
          let r = await response.json() ;
          if(r != null){
              console.log(r) ;
            document.getElementById(`editUserModalcolor`).classList.add("hidden");
            setchang(! chang)
          }
        } catch (error) {
          setError( Object.entries(error.errors)) ;
          console.error("Error fetching data:", error);
        }
      }
    return(
        <div
        id={`editUserModalcolor`}
        tabIndex="-1"
        aria-hidden="true"
        className="fixed flex top-0 hidden left-0 right-0 z-50 items-center justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <form onSubmit={(e) => adddata(e)} className="relative p-4 bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add color
              </h3>
              <button
                  onClick={() => document.getElementById(`editUserModalcolor`).classList.add("hidden")}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={`editUserModalcolor`}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
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
                  code
                </label>
                <input
                       onChange={(e) => setrefrens({...refrens , code : e.target.value})}
                  type="text"
                  id="meta_title"
                  placeholder="Enter titel"
                  className="w-full py-3 px-4 rounded-md  bg-gray-100 dark:bg-gray-500 dark:text-gray-300  dark:text-white focus:outline-none transition-all"
                />
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
    )
}