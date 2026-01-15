import api from "./api";

const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (err) {
        console.log("Login failed:", err.response?.data?.message || "Unknown error");
        throw err;
    }
};

const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return { email: payload.sub, role: payload.role, id: payload.id };
};

const logout = () => {
    localStorage.removeItem("token");
};

export const authService = {
    login,
    getCurrentUser,
    logout,
};
