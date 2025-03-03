"use client";

import { redirect } from "next/dist/server/api-utils";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Login(){
  const router = useRouter();

  const email = useRef(null) ;
  const password = useRef(null);
  const [errors, setErrors] = useState({ email: "", password: "" , backend:"" });
  function validateInputs(email, password) {
    let valid = true;
    let newErrors = { email: "", password: "" ,backend:""};

    // التحقق من البريد الإلكتروني بصيغة صحيحة
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // التحقق من كلمة المرور
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function fetchData(email , password) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
            credentials: "include", 
        });
        if (!response.ok) {
          setErrors(e => ({...e , backend:"error"})) ;
          console.error("HTTP Error:", response.statusText);
          return;
        }

        const data = await response.json();

        if (data.token) {
            document.cookie = `admin=${data.token}; path=/; max-age=86400; Secure`;
            console.log("Login Successful:", data);
            router.push("/dashbord"); 
        } else {
            console.error("Token not found in response");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }
    function helndel(event){
      event.preventDefault( ) ;
      if (!validateInputs(email.current.value, password.current.value)) return;
      fetchData(email.current.value , password.current.value); ;
    }

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Ecommerc
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Admin Login
                {errors.backend && <p className="text-red-500 text-sm mt-1">email or password is not true</p>}
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    ref={email}
                  />
                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    ref={password}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
            
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </a>
                </div>
                <button
                onClick={(e) => helndel(e)} 
                  type="submit"
                  className="w-full  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                 Login 
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}