"use client";
import { useState } from "react";

export default function ReviewForm({id ,chang ,setChang}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({rating, comment , proudect_id : id })
 
    let token = document.cookie.split("user=")[1];
    fetch(`http://127.0.0.1:8000/api/review`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
      credentials: "include",
      body:JSON.stringify({rating, comment , proudect_id : id })

    })
      .then((response) => {
        setChang(! chang)
        setComment("");
        setRating(0) ;
        console.log(response.json());
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // مكون النجم الواحد
  const Star = ({ starId, rating, hoverRating, onMouseEnter, onMouseLeave, onClick }) => {
    let fillClass = "text-gray-300";
    if (hoverRating >= starId) {
      fillClass = "text-yellow-400";
    } else if (!hoverRating && rating >= starId) {
      fillClass = "text-yellow-400";
    }
    return (
      <svg
        onMouseEnter={() => onMouseEnter(starId)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onClick(starId)}
        className={`w-8 h-8 cursor-pointer ${fillClass} dark:text-gray-500`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.973c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.973a1 1 0 00-.364-1.118L2.05 9.4c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.973z" />
      </svg>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Your Review
      </h2>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((starId) => (
          <Star
            key={starId}
            starId={starId}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={setHoverRating}
            onMouseLeave={() => setHoverRating(0)}
            onClick={setRating}
          />
        ))}
      </div>
      <textarea
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Review
      </button>
    </form>
  );
}
