"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
      const router = useRouter();
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    phone2: "",
    address: "",
    city: "",
    country: "",
    img: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editMode, setEditMode] = useState(true); // إصلاح الخطأ

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setEditForm({ ...editForm, img: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      console.log(data)
      if (data.token ) {
        document.cookie = `user=${data.token}; path=/; max-age=86400; Secure`;
        router.push("/");
      }
    } catch (err) {
      setError(err.message || "An error occurred while updating the profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {error && <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{success}</div>}
        {loading && <div className="text-center">       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div></div>}

        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Name:</label>
              <input
                name="name"
                type="text"
                value={editForm.name}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Password:</label>
              <input
                name="password"
                type="password"
                value={editForm.password}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email:</label>
              <input
                name="email"
                type="email"
                value={editForm.email}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone:</label>
              <input
                name="phone"
                type="text"
                value={editForm.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone2:</label>
              <input
                name="phone2"
                type="text"
                value={editForm.phone2}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Upload Image:</label>
              <input
                name="img"
                type="file"
                onChange={handleFileChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Address:</label>
              <input
                name="address"
                type="text"
                value={editForm.address}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">City:</label>
              <input
                name="city"
                type="text"
                value={editForm.city}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Country:</label>
              <input
                name="country"
                type="text"
                value={editForm.country}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
            <Link href={"/login"} className="bg-blue-600 p-2 block  font-bold text-white rounded-lg" >Login</Link>
            <Link href={"/"} className="bg-slate-700 p-2 block  font-bold text-white rounded-lg" >Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
