import React from "react";

function ViewTask({ task, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center ">
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-2xl md:mx-0 mx-5">
                <h2 className="md:text-2xl text-base text-center mb-6 font-semibold text-gray-500">Task Details</h2>
                <div className="my-10">
                    <h3 className="text-gray-500 font-medium text-lg mb-4">Title: {task.title}</h3>
                    <p className="text-gray-500 font-medium text-lg mb-4">Description: {task.description}</p>
                    <p className="text-gray-500 font-medium text-lg mb-4">Created At: {new Date(task.createdAt).toLocaleString()} </p>
                </div>
                <div className="w-full text-end mt-10">
                    <button onClick={() => onClose(false)} className="text-white font-medium px-6 py-2 bg-blue-500 rounded">Close</button>
                </div>
            </div>
        </div>
    )
}

export default ViewTask;
