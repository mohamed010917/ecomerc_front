"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Edit({ chang, setchang, ed, seted, open, setopen }) {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [searchParam, setSearchParam] = useState("");
  let token = document.cookie.split("admin=")[1];

  // تحديث البيانات عند تغير ed
  useEffect(() => {
    if (ed) {
      setData({
        order_id: ed.order_id,
        user_id: ed.user_id,
        payment_status: ed.payment_status,
        amount: ed.amount,
        _method: "PUT"
      });
    }
  }, [ed]);

  // جلب بيانات الأوردر والمستخدم
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
    fetch(`http://127.0.0.1:8000/api/pays/${ed.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data) {
          setopen(false);
          seted({});
          setchang(!chang);
        }
      })
      .catch(() => showError());
  }

  function showError() {
    let ele = document.getElementById("error");
    ele.classList.remove("hidden");
    setTimeout(() => ele.classList.add("hidden"), 2000);
  }

  // تحويل بيانات الأوردر والمستخدم إلى options مناسبة لـ react-select
  const orderOptions = orders.map(o => ({
    value: o.id,
    label: `${o.id} - ${o.user.name}`
  }));
  const userOptions = users.map(u => ({
    value: u.id,
    label: u.name
  }));

  return (
    <>
      <div id="error" className="bg-red-700 hidden fixed top-10 left-10 p-4 rounded-md text-white">
        There is some error, please try again.
      </div>
      <div className={`fixed top-0 ${open ? "flex" : "hidden"} left-0 right-0 z-50 items-center justify-center w-full p-4`}>
        <div className="relative w-full max-w-2xl">
          <form onSubmit={save} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900">Add Item</h3>
            <button onClick={() => setopen(false)} type="button" className="absolute top-3 right-3 text-gray-400">
              ✕
            </button>
            <div className="mt-4 space-y-4">
              <Select
                options={orderOptions}
                value={orderOptions.find(option => option.value === data.order_id) || null}
                onChange={(selectedOption) => setData({ ...data, order_id: selectedOption.value })}
                placeholder="Select order"
              />

              <Select
                options={userOptions}
                value={userOptions.find(option => option.value === data.user_id) || null}
                onChange={(selectedOption) => setData({ ...data, user_id: selectedOption.value })}
                placeholder="Select user"
              />

              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded"
                value={data.amount || ""}
                onChange={(e) => setData({ ...data, amount: e.target.value })}
              />

              <select
                className="w-full p-2 border rounded"
                value={data.payment_status || ""}
                onChange={(e) => setData({ ...data, payment_status: e.target.value })}
              >
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
