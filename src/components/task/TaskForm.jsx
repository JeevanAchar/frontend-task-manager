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
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title">title</label>
                        <input type="text" name="title" id="title" className="p-2 border rounded w-full" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} />
                        <div>
                            {
                                formik.errors.title && formik.touched.title ?
                                    <span className="text-red-500 text-sm">{formik.errors.title}</span> :
                                    null
                            }
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description">description</label>
                        <input type="text" name="description" id="description" className="p-2 border rounded w-full" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                        <div>
                            {
                                formik.errors.description && formik.touched.description ?
                                    <span className="text-red-500 text-sm">{formik.errors.description}</span> :
                                    null
                            }
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2" >cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm;
