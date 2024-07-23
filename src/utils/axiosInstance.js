import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

axiosInstance.interceptors.request.use((request) => {
    request.headers["Authorization"] = window.localStorage.getItem("token");
    return request;
})

axiosInstance.interceptors.response.use((response) => {
    const { status } = response;

    if (status < 399) {
        return response;
    }

    if (status === 401) {
        window.location.href = "/login";
    }

    if (status >= 500) {
        alert("Internal Server Error");
    }

    return response;
});

export default axiosInstance;
