import React from "react";
import { useFormik } from "formik";
import { useTask } from "../context/TaskContext";

function EditTask({ task, onSave, onCancel }) {
    const { title, description, createdAt, _id, status } = task;
    const { handleEditTask } = useTask();

    const handleChanges = (values) => {
        try {
            handleEditTask(values);
            onSave(false);
        } catch (err) {
            console.error(err);
        }
    }

    const initialValues = {
        title: title,
        description: description,
        status: status,
        _id: _id
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => handleChanges(values)
    })

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg mx-4 md:mx-0 md:w-1/2 w-full">
                <h2 className="md:text-3xl text-xl mb-6 text-center font-medium text-gray-500 underline">Edit</h2>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="title" className="text-gray-500 md:text-lg text-base font-medium block mb-2">Title: </label>
                        <input type="text" id="title" name="title" placeholder="title" className="p-2 border-2 border-gray-300 rounded w-full outline-gray-400" value={formik.values.title} onChange={formik.handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="text-gray-500 md:text-lg text-base font-medium block mb-2">Description: </label>
                        <input type="text" id="description" name="description" placeholder="Description" className="p-2 border-2 border-gray-300 rounded w-full outline-gray-400" value={formik.values.description} onChange={formik.handleChange} />
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-500 md:text-lg text-base font-medium block">CreatedAt: </p>
                        <p className="py-2 text-gray-500">{new Date(createdAt).toLocaleString()}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="status" className="text-gray-500 md:text-lg text-base font-medium block">Status:</label>
                        <select name="status" id="status" className="px-3 py-1 border-2 border-gray-300 rounded w-full outline-gray-400 max-w-40" onChange={formik.handleChange} value={formik.values.status}>
                            <option value="todo">Todo</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <button type="submit" className="bg-blue-600 px-5 py-1 rounded-md text-center text-white font-semibold hover:bg-blue-700">Save</button>
                        <button type="button" onClick={() => onCancel(false)} className="bg-gray-500 px-5 py-1 rounded-md text-center text-white font-semibold hover:bg-gray-600">Cancel</button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default EditTask;
