import api from "./api";

export const imageService = {
    upload: async (file, containerName) => {
        const formData = new FormData();
        formData.append("containerName", containerName);
        formData.append("file", file);

        const response = await api.post("/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },
};
