"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const token = document.cookie.split("admin=")[1];
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    status: "",
    country: "",
    imgFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);


  // دالة لجلب بيانات الملف الشخصي باستخدام user.id
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/me`, {
        method : "POST" ,
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }
      const data = await response.json();
      setProfile(data.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message || "An error occurred while fetching the profile");
    } finally {
      setLoading(false);
    }
  };

 


  useEffect(() => {

      fetchProfile();

  }, []);

  // التبديل إلى وضع التعديل وتحميل البيانات الحالية في النموذج
  const handleEdit = () => {
    if (profile) {
      setEditForm({
        name: profile.name,
        id: profile.id,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        status: profile.status,
        country: profile.country,
        imgFile: null,
      });
      setEditMode(true);
      setError(null);
      setSuccess(null);
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // التعامل مع رفع الملف
  const handleFileChange = (e) => {
    setEditForm({ ...editForm, imgFile: e.target.files[0] });
  };

  // تحديث بيانات الملف الشخصي باستخدام FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", profile.id);
      formDataToSend.append("name", editForm.name);
      formDataToSend.append("email", editForm.email);
      formDataToSend.append("password", editForm.password);
      formDataToSend.append("phone", editForm.phone);
      formDataToSend.append("address", editForm.address);
      formDataToSend.append("city", editForm.city);
      formDataToSend.append("country", editForm.country);
      formDataToSend.append("_method", "PUT");
      // إضافة الصورة فقط إذا تم اختيار ملف جديد
      if (editForm.imgFile) {
        formDataToSend.append("img", editForm.imgFile);
      }
      console.log(editForm)
      console.log(formDataToSend) ;
      const response = await fetch(`http://127.0.0.1:8000/api/users/${profile.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      const data = await response.json();
      setProfile(data.data);
      setSuccess("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      console.log("Error updating profile:", err);
      setError(err.message || "An error occurred while updating the profile");
    } finally {
      setLoading(false);
    }
  };

  // مسح رسالة النجاح تلقائيًا بعد 3 ثواني
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Profile</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
            {success}
          </div>
        )}

        {loading && <div className="text-center">       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div></div>}

        {/* وضع العرض */}
        {profile && !editMode && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                {profile.img ? (
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
                <p className="text-gray-600 dark:text-gray-300">{profile.phone}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Address:</p>
                <p>{profile.address}</p>
              </div>
              <div>
                <p className="font-semibold">City:</p>
                <p>{profile.city}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{profile.status}</p>
              </div>
              <div>
                <p className="font-semibold">Country:</p>
                <p>{profile.country}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* وضع التعديل */}
        {profile && editMode && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Name:</label>
                <input
                  name="name"
                  type="text"
                  value={editForm.name ? editForm.name : ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email:</label>
                <input
                  name="email"
                  type="email"
                  value={editForm.email ? editForm.email : ""}
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
                  value={editForm.phone ? editForm.phone : ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload Image:</label>
                <input
                  name="imgFile"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
                {profile.img && !editForm.imgFile && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Current image will be used if no new file is selected.
                  </p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Address:</label>
                <input
                  name="address"
                  type="text"
                  value={editForm.address ? editForm.address : ""}
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
                  value={editForm.city ? editForm.city : ""}
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
                  value={editForm.country ? editForm.country : ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
