import React from "react";
import { MdEventNote } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full bg-blue-600 min-h-[60px] flex items-center justify-between px-6 sticky top-0">
            <div className="text-white text-2xl">
                <MdEventNote />
            </div>
            <div className="flex gap-5 items-center">
                <Link to="/login" className="bg-white px-5 py-1 rounded-md text-center text-blue-600 font-semibold hover:underline">Login</Link>
                <Link to="/signup" className="bg-transparent px-5 py-1 rounded-md text-center text-white font-semibold hover:underline">Signup</Link>
            </div>
        </nav>
    );
}

export default Navbar;
