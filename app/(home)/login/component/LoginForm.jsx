"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";

export default function LoginForm() {
  const router = useRouter();
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState({ email: "", password: "", backend: "" });

  function validateInputs(email, password) {
    let valid = true;
    let newErrors = { email: "", password: "", backend: "" };

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

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

  async function fetchData(email, password) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        setErrors((e) => ({ ...e, backend: "Invalid email or password" }));
        return;
      }

      const data = await response.json();
      console.log(data)
      if (data.token ) {
        document.cookie = `user=${data.token}; path=/; max-age=86400; Secure`;
        router.push("/");
        window.location.reload(); 
      }
      // router.push("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateInputs(email.current.value, password.current.value)) return;
    fetchData(email.current.value, password.current.value);
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <InputField
        label="Your email"
        type="email"
        name="email"
        placeholder="name@company.com"
        refValue={email}
        error={errors.email}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        refValue={password}
        error={errors.password}
      />
      <ErrorMessage message={errors.backend} />

      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Login
      </button>
    </form>
  );
}
