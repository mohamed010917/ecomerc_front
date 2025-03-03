"use client";
import { useState, useEffect, useRef } from "react";

export default function Edit({ id, data, chang, setchang }) {
  const [catgory, setcatgory] = useState([]);
  const img = useRef(null);
  const [error, setError] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError([]);
    }, 20000);
    return () => clearTimeout(timer);
  }, [error]);

  const [refrens, setrefrens] = useState({
    name: data.name,
    description: data.description,
    slug: data.slug,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
  });

  async function adddata(e) {
    e.preventDefault();
    let token = document.cookie.split("admin=")[1];
    const formData = new FormData();
    try {
      formData.append("name", refrens.name);
      if (img.current.files[0]) {
        formData.append("img", img.current.files[0]);
      }
      formData.append("description", refrens.description);
      formData.append("meta_title", refrens.meta_title);
      formData.append("meta_description", refrens.meta_description);
      formData.append("slug", refrens.slug);
      formData.append("_method", "PUT");

      const response = await fetch(
        `http://127.0.0.1:8000/api/brands/${data.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        let error = await response.json();
        setError(Object.entries(error.errors));
        return;
      }
      let r = await response.json();
      if (r) {
        document
          .getElementById(`editUserModal${id}`)
          .classList.add("hidden");
        setchang(!chang);
      }
    } catch (error) {
      setError(Object.entries(error.errors));
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div
      id={`editUserModal${id}`}
      tabIndex="-1"
      aria-hidden="true"
      className="fixed flex top-0 hidden left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <form
          onSubmit={adddata}
          className="relative p-4 bg-white rounded-lg shadow-sm dark:bg-gray-700"
        >
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Orders
            </h3>
            <button
              onClick={() =>
                document
                  .getElementById(`editUserModal${id}`)
                  .classList.add("hidden")
              }
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide={`editUserModal${id}`}
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
                onChange={(e) =>
                  setrefrens({ ...refrens, name: e.target.value })
                }
                value={refrens.name || ""}
                type="text"
                id="name"
                placeholder="Enter name"
                className="w-full py-3 px-4 rounded-md dark:text-white bg-gray-100 dark:bg-gray-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="meta_title"
                className="block text-sm font-medium dark:text-white mb-2"
              >
                Meta Title
              </label>
              <input
                onChange={(e) =>
                  setrefrens({ ...refrens, meta_title: e.target.value })
                }
                value={refrens.meta_title || ""}
                type="text"
                id="meta_title"
                placeholder="Enter title"
                className="w-full py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-500 dark:text-white focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Slug
              </label>
              <input
                onChange={(e) =>
                  setrefrens({ ...refrens, slug: e.target.value })
                }
                value={refrens.slug || ""}
                type="text"
                id="slug"
                placeholder="Enter slug"
                className="w-full py-3 px-4 rounded-md dark:text-white bg-gray-100 dark:bg-gray-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                onChange={(e) =>
                  setrefrens({ ...refrens, status: e.target.value })
                }
                value={refrens.status || ""}
                className="w-full p-2 bg-white dark:bg-gray-600 dark:text-white border rounded-md"
                name="status"
                id="status"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 dark:text-white text-sm font-medium"
              >
                Description
              </label>
              <textarea
                onChange={(e) =>
                  setrefrens({ ...refrens, description: e.target.value })
                }
                value={refrens.description || ""}
                className="border rounded-md p-2 shadow-md focus:outline-none"
                name="description"
                id="description"
                cols="30"
                rows="10"
              >
                {data.description || ""}
              </textarea>
            </div>
            <div>
              <label
                htmlFor="meta_description"
                className="block mb-2 dark:text-white text-sm font-medium"
              >
                Meta Description
              </label>
              <textarea
                onChange={(e) =>
                  setrefrens({
                    ...refrens,
                    meta_description: e.target.value,
                  })
                }
                value={refrens.meta_description || ""}
                className="border rounded-md p-2 shadow-md focus:outline-none"
                name="meta_description"
                id="meta_description"
                cols="30"
                rows="10"
              >
                {data.meta_description || ""}
              </textarea>
            </div>
            <div>
              <label
                htmlFor="img"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Image
              </label>
              <input
                ref={img}
                className="block w-full text-sm text-gray-900 border border-gray-300 p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
              />
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
      <div className="fixed top-10 left-10 text-2xl font-bold">
        {error.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{item[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
