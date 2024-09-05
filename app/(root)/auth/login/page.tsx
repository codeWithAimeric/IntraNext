import React from 'react';
import { signIn } from "@/auth"
// import { useEffect, useState } from 'react';
import { loginSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';

export default function Login() {
  
  return (
    <div>
      <h1>Login</h1>
      <form
      action={async (formData) => {
        "use server"
        const res = await signIn("credentials", {
          redirect: false, 
          email: formData.get("email"),
          password: formData.get("password"),
        });
        console.log('res in login = = = = ',res );
        if(res){
          return {
            redirect: {
              destination: "/c/home",
            },
          };
        } else {
          // setError("Error in the login form");
          console.log('not logged in');

        }
      }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        <button>Sign In</button>
      </form>
    </div>
  );
}
