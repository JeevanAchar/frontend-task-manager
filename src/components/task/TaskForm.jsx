import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
});

function TaskForm({ onSave, task, onClose }) {
    const initialValues = task || {
        title: "",
        description: "",
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave(values);
            onClose();
        }
    })

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="w-full bg-white p-4 rounded shadow-lg md:w-1/2 mx-5 md:mx-0">
                <h2 className="sm:text-3xl text-xl mb-6 text-center font-medium text-gray-500 underline">Add Task</h2>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="text-gray-500 sm:text-lg text-base font-medium block mb-1">title</label>
                        <input type="text" name="title" id="title" className="p-2 border-2 border-gray-300 rounded w-full outline-gray-400" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} />
                        <div>
                            {
                                formik.errors.title && formik.touched.title ?
                                    <span className="text-red-500 text-sm">{formik.errors.title}</span> :
                                    null
                            }
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="text-gray-500 sm:text-lg text-base font-medium block mb-1">description</label>
                        <input type="text" name="description" id="description" className="p-2 border-2 border-gray-300 rounded w-full outline-gray-400" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                        <div>
                            {
                                formik.errors.description && formik.touched.description ?
                                    <span className="text-red-500 text-sm">{formik.errors.description}</span> :
                                    null
                            }
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 px-5 py-1 rounded-md text-center text-white font-semibold hover:bg-gray-600" >cancel</button>
                        <button type="submit" className="bg-blue-600 px-5 py-1 rounded-md text-center text-white font-semibold hover:bg-blue-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm;
