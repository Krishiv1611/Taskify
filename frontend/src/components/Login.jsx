import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      alert(data.message);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/create");
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] px-4">
      <h1 className="text-5xl font-extrabold mb-10 text-gradient bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
        Taskify
      </h1>

      <div className="w-full max-w-md p-8 bg-[#1e293b] rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Login</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-[#334155] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-[#334155] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          New user?{" "}
          <Link to="/" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;




