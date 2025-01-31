import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required")
})

function Signup() {
    const navigate = useNavigate();
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { data } = await axiosInstance.post("/api/user/register", values);
            if (data.message === "Success") {
                const { token, email, id } = data.data;
                window.localStorage.setItem("userId", id);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("token", token);
                toast.success("Registered Successfully")
                navigate("/");
            } else {
                window.localStorage.clear();
            }
            resetForm();
        } catch (err) {
            toast.error("Failed to register");
            window.localStorage.clear();
            resetForm();
            console.error(err.message);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, formikHelpers) => {
            handleSubmit(values, formikHelpers)
        }
    });

    return (
        <div className="flex justify-center items-center mt-10 bg-white">
            <div className="w-full max-w-md mb-4">
                <h2 className="text-blue-600 text-2xl font-bold mb-4 mx-5 md:mx-0">Signup</h2>
                <div className="border-2 border-blue-500 p-4 rounded-lg mx-5 md:mx-0">
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                                autoComplete="on" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
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
                                autoComplete="on" onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur} />
                            <div>
                                {
                                    formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                        <span className="text-red-500 text-xs">{formik.errors.confirmPassword}</span>
                                        : null
                                }
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-normal py-2 px-4 rounded">Login</button>
                        <div className="mt-4 text-center text-sm sm:text-base">
                            <p className="font-semibold">
                                Don't have an account?{' '}
                                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
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
