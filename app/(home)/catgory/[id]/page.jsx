"use client";
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import Reting from '../../commponents/Reting';
import Slid from '../components/Slid';
import Coments from '../components/Coments';
import { useRouter } from "next/navigation";
import Proudect from '../components/Proudect';
function Page({ params }) {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
  const [chang, setChang] = useState(true);
  const [data, setData] = useState(null);


  useEffect(() => {
    const method = "GET";
    const api = `http://127.0.0.1:8000/api/catgory/${id}`;
    fetch(api, {
      method: method,
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("API Error:", errorData);
            throw new Error("Failed to fetch data");
          });
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.data) {
          setData(responseData.data);
        } else {
          console.error("Unexpected data format:", responseData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [chang, id]);


    const router = useRouter();
    function add() {
      let token = document.cookie.split("user=")[1];
      if (!token) {
        router.push("/login");
        return;
      }
      fetch("http://127.0.0.1:8000/api/order/add", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          proudect_id: id,
          quantity: 1,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  if (data) {
    return (
      <>
      <div >
        <Head>
          <title>{data.meta_title}</title>
          <meta name="description" content={data.meta_description} />
        </Head>
        <div className="container mx-auto">
   
          <section className="py-8 lg:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden dark:border-gray-700 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <img
                      className="w-full h-full object-cover"
                      src={
                        data.img
                          ? data.img
                          : "https://flowbite.com/docs/images/products/apple-watch.png"
                      }
                      alt={data.name}
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.name}
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {data.description}
                    </p>           
                    <div className="mt-6">
                 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>        
        <Proudect  data={data.proudect}/>            
      </>
    );
  } else {
    return <div>  </div>;
  }
}

export default Page;
