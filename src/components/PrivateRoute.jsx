import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

function PrivateRoute({ allowedRoles }) {
    const location = useLocation();
    const currentUser = authService.getCurrentUser();

    if (!currentUser || !currentUser.role) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;
