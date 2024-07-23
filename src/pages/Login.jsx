import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

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
                window.localStorage.setItem("token", data.data.token);
                window.localStorage.setItem("email", data.data.email);
                navigate("/");
            }else{
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
            handleSubmit(values,formikHelpers);
        }
    });

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md">
                <h2 className="text-blue-600 text-2xl font-bold mb-4">Login</h2>
                <div className="border-2 border-blue-600 p-4 rounded-lg">
                    <form action="" autoComplete="off" onSubmit={formik.handleSubmit}>
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
                                onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                            <div>
                                {
                                    formik.touched.password && formik.errors.password ?
                                        <span className="text-red-500 text-xs">{formik.errors.password}</span>
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

export default Login;
