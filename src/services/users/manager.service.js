import api from "./api";

export const managerUserService = {
    getUsers: (workObjectId) =>
        api.get("/manager/users", {
            params: workObjectId ? { work_object_id: workObjectId } : {},
        }),
    getUsersSimple: () => api.get("/manager/users/simple"),
};
