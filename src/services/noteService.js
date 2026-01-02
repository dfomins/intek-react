import api from "./api";

export const noteService = {
    getNotes: () => api.get("/notes"),
    getNote: (id) => api.get(`/notes/${id}`),
    postNote: (payload) => api.post("/notes", payload),
    updateNote: (id, payload) => api.put(`/notes/${id}`, payload),
    deleteNote: (id) => api.delete(`/notes/${id}`),
};
