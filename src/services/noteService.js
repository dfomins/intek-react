import api from "./api";

export const noteService = {
    getNotes: () => api.get("/notes"),
    getNote: (id) => api.get(`/notes/${id}`),
};
