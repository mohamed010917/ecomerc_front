"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function AddItem({  chang, setchang ,action ,  setAction }) {

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({ order_id: "", user_id: "", payment_status: "", amount: "" });
  const [searchParam, setSearchParam] = useState("");
  let token = document.cookie.split("admin=")[1];

  useEffect(() => {
    fetchData("http://127.0.0.1:8000/api/orders/search", {}, setOrders);
    fetchData("http://127.0.0.1:8000/api/users/search", {}, setUsers);
  }, [searchParam]);

  function fetchData(api, body, setter) {
    fetch(api, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data) {
          setter(responseData.data);
        }
      })
      .catch((error) => console.log("Error fetching data:", error));
  }

  function save(e) {
  
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/pays", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
       
        if (responseData.data) {
          console.log(responseData)
          setAction(false);
          setchang(!chang);
        }
        console.log(responseData)
      })
      .catch(() => showError());
  }

  function showError() {

    let ele = document.getElementById("error");
    ele.classList.remove("hidden");
    setTimeout(() => ele.classList.add("hidden"), 2000);
  }

  return (
    <>
      <div id="error" className="bg-red-700 hidden fixed top-10 left-10 p-4 rounded-md text-white">
        There is some error, please try again.
      </div>
      <div className={`fixed top-0 ${action ? "flex" : "hidden"} left-0 right-0 z-50 items-center justify-center w-full p-4`}> 
        <div className="relative w-full max-w-2xl">
          <form onSubmit={save} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900">Add Item</h3>
            <button onClick={() => setAction(false)} type="button" className="absolute top-3 right-3 text-gray-400">✕</button>
            <div className="mt-4 space-y-4">
              <Select options={orders.map(o => ({ value: o.id, label: `${o.id} - ${o.user.name}` }))} onChange={(e) => setData({ ...data, order_id: e.value })} placeholder="Select order" />
              <Select options={users.map(u => ({ value: u.id, label: u.name }))} onChange={(e) => setData({ ...data, user_id: e.value })} placeholder="Select user" />
              <input type="number" placeholder="Amount" className="w-full p-2 border rounded" onChange={(e) => setData({ ...data, amount: e.target.value })} />
              <select className="w-full p-2 border rounded" onChange={(e) => setData({ ...data, payment_status: e.target.value })}>
                <option value="">Select Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
