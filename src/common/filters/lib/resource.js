export const resource = (file) => {
    if (!file) return "";

    return import.meta.env.VITE_BASE_RESOURCE_URL + file;
};
