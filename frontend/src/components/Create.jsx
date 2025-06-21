import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Create = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [deadline, setdeadline] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  async function handlecreate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, deadline })
      });

      const data = await res.json();
      alert(data.message);
      console.log(data);
    } catch (error) {
      console.error("Task creation failed:", error);
      alert("Failed to create task.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center p-4">
      <div className="bg-[#1e293b] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create a New Task</h2>
        <form onSubmit={handlecreate} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={e => settitle(e.target.value)}
            className="w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={e => setdescription(e.target.value)}
            className="w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded focus:outline-none"
          />
          <div>
            <h3 className="text-white mb-1">Enter Deadline</h3>
            <input
              type="date"
              value={deadline}
              onChange={e => setdeadline(e.target.value)}
              className="w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
          >
            Create Task
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/mytask" className="text-blue-400 hover:underline">See existing Tasks</Link>
        </div>
      </div>
    </div>
  );
};

export default Create;



