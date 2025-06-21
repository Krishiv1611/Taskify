import React from 'react';

const Task = ({ title, description, date, deadline, ondelete, onupdate }) => {
  return (
    <div className="bg-[#1e293b] text-white p-4 rounded shadow mb-4 w-full max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-1 text-gray-300">{description}</p>
      {date && <p className="text-sm text-gray-400">Created: {new Date(date).toLocaleDateString()}</p>}
      {deadline && (
        <p className="text-sm text-red-300 mb-2">Deadline: {new Date(deadline).toLocaleDateString()}</p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={onupdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        >
          Update
        </button>
        <button
          onClick={ondelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;

