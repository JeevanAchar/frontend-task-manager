import React from "react";
import { MdEventNote } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
    const user = window.localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            window.localStorage.clear();
            navigate("/login");
            toast.success("Successfully LoggedOut");
        } catch (err) {
            toast.error("Failed to logout")
            console.log(err);
        }
    }

    return (
        <nav className="w-full bg-blue-600 min-h-[60px] flex items-center justify-between px-6 sticky top-0">
            <div className="text-white flex items-center gap-2">
                <MdEventNote className="text-2xl" />
                <Link to="/" className="hover:underline">Home</Link>
            </div>
            {
                !user ?
                    <div className="flex gap-5 items-center">
                        <Link to="/login" className="bg-slate-100 px-5 py-1 rounded-md text-center text-blue-600 font-semibold hover:bg-white">Login</Link>
                        <Link to="/signup" className="bg-transparent px-5 py-1 rounded-md text-center text-white font-semibold hover:underline">Signup</Link>
                    </div>
                    :
                    <div>
                        <button type="button" className="bg-red-500 px-5 py-1 rounded-md text-center text-white font-semibold hover:bg-red-600" onClick={handleLogout}>Logout</button>
                    </div>
            }
        </nav>
    );
}

export default Navbar;
