"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

function TopUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // متغير لتحسين تجربة المستخدم

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = document.cookie.split("admin=")[1];
        const response = await fetch("http://127.0.0.1:8000/api/topusers", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!response.ok) {
          document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        if (responseData.data) {
          setData(responseData.data);
        } else {
          console.error("Unexpected data format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">لا توجد بيانات متاحة.</p>;
  }

  // تجهيز البيانات للرسم البياني
  const chartData = {
    labels: data.map((user) => user.user.name),
    datasets: [
      {
        label: " count",
        data: data.map((user) => user.order_count),
        backgroundColor: [
          "#007bff", "#dc3545", "#28a745", "#fd7e14", "#ffc107",
          "#6f42c1", "#343a40", "#17a2b8", "#20c997", "#e83e8c",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true, // ✅ تفعيل عرض العنوان
        text: "Top 10 users tacke orders", // ✅ نص العنوان
        font: {
          size: 18, // ✅ حجم الخط
          weight: "bold", // ✅ سمك الخط
        },
      },
      legend: {
        position: "bottom", // ✅ يضع التسميات أسفل الرسم البياني
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "500px" }} className="p-2 m-2">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default TopUser;
