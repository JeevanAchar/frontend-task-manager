import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required")
});

function Login() {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { data } = await axiosInstance.post("/api/user/login", values);
            if (data) {
                const { token, email, id } = data.data;
                window.localStorage.setItem("userId", id);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("token", token);
                navigate("/");
            } else {
                window.localStorage.clear();
            }
            resetForm();
        } catch (err) {
            console.error(err);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, formikHelpers) => {
            handleSubmit(values, formikHelpers);
        }
    });

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md">
                <h2 className="text-blue-600 text-2xl font-bold mb-4 mx-5 md:mx-0">Login</h2>
                <div className="border-2 border-blue-500 p-4 rounded-lg mx-5 md:mx-0">
                    <form onSubmit={formik.handleSubmit} autoComplete="off" >
                        <div className="my-3">
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
                        <button type="submit" className="w-full bg-blue-600 text-white font-normal py-2 px-4 rounded">Login</button>
                        <div className="mt-4 text-center text-sm md:text-base">
                            <p className="font-semibold">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
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

export default Login;
