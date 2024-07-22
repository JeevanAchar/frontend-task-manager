import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required")
})

function Signup() {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const handleSubmit = async (values) => {
        try {
            const { data } = await axiosInstance.post("/api/user", values);
            console.log(data.message);
        } catch (err) {
            console.error(err.message);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-md">
                <h2 className="text-blue-600 text-2xl font-bold mb-4">Signup</h2>
                <div className="border-2 border-blue-600 p-4 rounded-lg">
                    <form action="" autoComplete="off" onSubmit={formik.handleSubmit}>
                        <div className="my-3">
                            <input type="text" id="firstName" name="firstName" placeholder="First Name" className="w-full outline-gray-400 border border-gray-300 px-3 py-2 rounded"
                                onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
                            <div>
                                {
                                    formik.touched.firstName && formik.errors.firstName ?
                                        <span className="text-red-500 text-xs">{formik.errors.firstName}</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="mb-4">
                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="w-full outline-gray-400 border border-gray-300 px-3 py-2 rounded"
                                onChange={formik.handleChange} value={formik.values.lastName} />
                        </div>
                        <div className="mb-4">
                            <input type="text" id="email" name="email" placeholder="Email" className="w-full outline-gray-400 border border-gray-300 px-3 py-2 rounded"
                                onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                            <div>
                                {
                                    formik.touched.email && formik.errors.email ?
                                        <span className="text-red-500 text-xs">{formik.errors.email}</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="mb-4">
                            <input type="password" id="password" name="password" placeholder="Password" className="w-full outline-gray-400 border border-gray-300 px-3 py-2 rounded"
                                onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                            <div>
                                {
                                    formik.touched.password && formik.errors.password ?
                                        <span className="text-red-500 text-xs">{formik.errors.password}</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="mb-4">
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className="w-full outline-gray-400 border border-gray-300 px-3 py-2 rounded"
                                onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur} />
                            <div>
                                {
                                    formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                        <span className="text-red-500 text-xs">{formik.errors.confirmPassword}</span>
                                        : null
                                }
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-normal py-2 px-4 rounded">Login</button>
                        <div className="mt-4 text-center">
                            <p className="font-semibold">
                                Don't have an account?{' '}
                                <a href="#" className="text-blue-600 hover:underline">Signup</a>
                            </p>
                            <button className="bg-blue-600 text-white rounded-md py-2 px-6 mt-4">
                                Login with <span className="font-semibold">Google</span>
                            </button>
                        </div>
                    </form >
                </div>
            </div>
        </div>
    );
}

export default Signup;
