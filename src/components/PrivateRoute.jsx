import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/authService";

export const PrivateRoute = () => {
    const currentUser = authService.getCurrentUser(); // returns null if not logged in
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
