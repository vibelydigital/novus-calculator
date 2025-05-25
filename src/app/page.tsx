'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: Implement real login logic
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-100">
      <section className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="nt-form bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="nt-title text-center mb-6">Welcome Back</h2>

          <div>
            <label className="nt-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="nt-input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="nt-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="nt-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="nt-button mt-4 w-full">Login</button>
        </form>
      </section>

      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} <strong className="text-black">VibelyDigital</strong> · Built with ❤️ by your dev team
      </footer>
    </main>
  );
}
