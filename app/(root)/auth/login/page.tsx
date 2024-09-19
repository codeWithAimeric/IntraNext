"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/server/actions";
import SocialLogins from "@/components/SocialLogins";


const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/c/home");
        setInterval(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }


  return (
    <>
      <div className="text-xl text-red-600">{error}</div>
      <div className="my-5 p-5 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Login</h1>
          <form className="mb-6" onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" />
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors">
              Login
            </button>
          </form>
        </div>
        <div className="mb-6">
          <SocialLogins />
        </div>
      </div>
    </>
  );
};

export default LoginForm;