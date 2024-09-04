'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { loginSchema } from '@/lib/zod';

export default function Login() {
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log('submit login');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
          />
        </label>
        <br />
        <label>
          Password
          <input
            name="password"
            type="password"
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
