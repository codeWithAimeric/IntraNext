'use client';
import React, {useState} from 'react';
import {z} from 'zod';
import { registerSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const validationResult = registerSchema.safeParse({ email, password });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if(res.ok) {
        router.push('/auth/login');
      }
    }catch(error) { 
      console.log(error);
    }
      

  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            placeholder='Email'
            required
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            placeholder='Password'
            required
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
