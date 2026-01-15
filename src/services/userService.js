import api from "./api";

export const userService = {
    getMe: () => api.get("/users/me"),
    getUsers: (workObjectId) =>
        api.get("/manager/users", {
            params: workObjectId ? { work_object_id: workObjectId } : {},
        }),
    getUsersSimple: () => api.get("/manager/users/simple"),
};
