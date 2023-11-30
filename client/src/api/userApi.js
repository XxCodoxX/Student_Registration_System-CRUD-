import axiosInstance from "../Service/customAxios.service";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getAllUsersApi = async () => {
    return axiosInstance.get(`${BASE_URL}/user`);
}

export const addNewUsersApi = async (body) => {
    return axiosInstance.post(`${BASE_URL}/user/add`,body);
}

export const editUsersApi = async (body) => {
    return axiosInstance.post(`${BASE_URL}/user/update`,body);
}

export const deleteUsersApi = async (id) => {
    return axiosInstance.delete(`${BASE_URL}/user/delete?id=${id}`);
}