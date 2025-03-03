"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const token = document.cookie.split("admin=")[1];
  const [settings, setSettings] = useState([]);
  const [formData, setFormData] = useState({ key: '', value: '', img: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Fetch settings from API with error handling
  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/setting', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load settings");
      }
      const data = await response.json();
      setSettings(data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError(error.message || "An error occurred while fetching settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Delete a setting with error handling
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/setting/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete setting");
      }
      setSuccess("Setting deleted successfully");
      fetchSettings();
    } catch (error) {
      console.error('Error deleting setting:', error);
      setError(error.message || "An error occurred while deleting the setting");
    }
  };

  // Populate fields for editing
  const handleEdit = (setting) => {
    setEditing(setting.id);
    setFormData({ key: setting.key, value: setting.value, img: setting.img });
    setError(null);
    setSuccess(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update a setting with error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const method = editing ? 'PUT' : 'POST';
    const url = editing 
      ? `http://127.0.0.1:8000/api/setting/${editing}` 
      : 'http://127.0.0.1:8000/api/setting';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || (editing ? "Failed to update setting" : "Failed to add setting")
        );
      }
      setFormData({ key: '', value: '', img: '' });
      setEditing(null);
      setSuccess(editing ? "Setting updated successfully" : "Setting added successfully");
      fetchSettings();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || "An error occurred while submitting the form");
    }
  };

  // Automatically clear success messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>

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

      {/* Add/Edit form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            name="key"
            type="text"
            placeholder="Key"
            value={formData.key}
            onChange={handleChange}
            className="border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
            required 
          />
          <input 
            name="value"
            type="text"
            placeholder="Value"
            value={formData.value}
            onChange={handleChange}
            className="border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
            required 
          />
          <input 
            name="img"
            type="text"
            placeholder="Image URL"
            value={formData.img || ""}
            onChange={handleChange}
            className="border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'}
        </button>
      </form>

      {loading ? (
        <div>       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Key</th>
                <th className="py-2 px-4 border">Value</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {settings.map(setting => (
                <tr key={setting.id} className="dark:text-white">
                  <td className="py-2 px-4 border">{setting.key}</td>
                  <td className="py-2 px-4 border">{setting.value}</td>
                  <td className="py-2 px-4 border">
                    {setting.img && (
                      <img src={setting.img} alt={setting.key} className="h-10" />
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    <button 
                      onClick={() => handleEdit(setting)} 
                      className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(setting.id)} 
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
