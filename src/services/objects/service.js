import api from "../api";

export const workObjectService = {
    getObjects: (mine = false) =>
        api.get("/work_objects", {
            params: mine ? { mine: true } : {},
        }),
    getObject: (id) => api.get(`/work_objects/${id}`),
};
