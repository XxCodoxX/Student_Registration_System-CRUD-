import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (credentials) => {
  return await axios.post(`${BASE_URL}/auth/login`, credentials);
};

export const isAuthenticated = () =>{
    return (localStorage.getItem('TOKEN'))? true: false;
  }

export const logout = () => {
  localStorage.removeItem("TOKEN");
};

export const getTokens = () => {
  return JSON.parse(localStorage.getItem("TOKEN"));
};

export const setToken = (tokens) => {
  localStorage.setItem("TOKEN", tokens);
};
