import api from "../api";

export const foremanWorkObjectService = {
    getObjectsSimple: () => api.get("/foreman/work_objects/simple"),
};
