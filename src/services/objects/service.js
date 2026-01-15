import api from "../api";

export const workObjectService = {
    getObjects: () => api.get("/work_objects"),
    getObject: (id) => api.get(`/work_objects/${id}`),
    getObjectsSimple: () => api.get("/manager/work_objects/simple"),
    postObject: (payload) => api.post("/manager/work_objects", payload),
    syncUserObjects: (payload) => api.post("/manager/work_objects/user/sync", payload),
};
