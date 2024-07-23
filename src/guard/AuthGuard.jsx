import react from "react";

function AuthGuard({ children }) {
    const token = window.localStorage.getItem("token");

    if (!token) {
        return window.location.href = "/login";
    } else {
        return (
            <div>
                {children}
            </div>
        );
    }
}

export default AuthGuard;
