import api from "../api";

export const workObjectService = {
    getObjects: () => api.get("/work_objects"),
    getObject: (id) => api.get(`/work_objects/${id}`),
};
