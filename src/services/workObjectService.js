import api from "./api";

export const workObjectService = {
    getObjects: () => api.get("/work_objects"),
    getObjectsSimple: () => api.get("/work_objects/simple"),
    getObject: (id) => api.get(`/work_objects/${id}`),
    postObject: (payload) => api.post("/work_objects", payload),
    syncUserObjects: (payload) => api.post("/work_objects/user/sync", payload),
};
