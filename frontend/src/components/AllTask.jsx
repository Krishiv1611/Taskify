import React, { useEffect, useState } from 'react';
import Task from './Task';
import { Link } from 'react-router-dom';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');
  const [searchTitle, setSearchTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  // Fixed backend URL to localhost:8000
  const BASE_URL = "http://localhost:8000";

  async function handleUpdate(taskId, title, description, deadline) {
    try {
      const res = await fetch(`${BASE_URL}/tasks/update/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, deadline })
      });

      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === taskId ? { ...task, title, description, deadline } : task
          )
        );
        setEditingTaskId(null);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update task.");
    }
  }

  async function handleDelete(taskId) {
    try {
      const res = await fetch(`${BASE_URL}/tasks/delete/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        setTasks(prev => prev.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete task.");
    }
  }

  async function fetchTasks() {
    try {
      const url = searchTitle.trim()
        ? `${BASE_URL}/tasks/search?title=${encodeURIComponent(searchTitle.trim())}`
        : `${BASE_URL}/tasks/mytasks`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setTasks(data.tasks || []);
      } else {
        alert(data.message || 'No tasks found');
        setTasks([]);
      }
    } catch (error) {
      console.error("Fetching tasks failed:", error);
      alert("Failed to fetch tasks.");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [token]);

  function startEditing(task) {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDeadline(task.deadline ? task.deadline.split('T')[0] : '');
  }

  function cancelEditing() {
    setEditingTaskId(null);
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchTasks();
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Tasks</h2>

      <form onSubmit={handleSearch} className="flex gap-3 justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          className="p-2 rounded bg-[#1e293b] border border-gray-600 text-white w-1/2"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearchTitle('');
            fetchTasks();
          }}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear
        </button>
      </form>

      {tasks.length === 0 && <p className="text-center text-gray-400">No tasks found.</p>}

      <div className="flex flex-col items-center gap-4">
        {tasks.map(task =>
          editingTaskId === task._id ? (
            <div key={task._id} className="bg-[#1e293b] p-4 rounded w-full max-w-xl shadow">
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 mb-2 rounded bg-[#334155] text-white"
              />
              <input
                type="text"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 mb-2 rounded bg-[#334155] text-white"
              />
              <input
                type="date"
                value={editDeadline}
                onChange={e => setEditDeadline(e.target.value)}
                className="w-full p-2 mb-2 rounded bg-[#334155] text-white"
              />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleUpdate(task._id, editTitle, editDescription, editDeadline)}
                  className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-600 px-4 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <Task
              key={task._id}
              title={task.title}
              description={task.description}
              date={task.date}
              deadline={task.deadline}
              onupdate={() => startEditing(task)}
              ondelete={() => handleDelete(task._id)}
            />
          )
        )}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/create"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Create new task
        </Link>
      </div>
    </div>
  );
};

export default AllTask;






