import axios from "axios";
import { getTokens, logout, setToken } from "./auth.service";
const BASE_URL = import.meta.env.VITE_BASE_URL;

let refreshFlag = true;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const requestHandler = (request) => {
  const TOKENS = getTokens();

  if (TOKENS && !request.headers.Authorization) {
    request.headers.Authorization = TOKENS
      ? "Bearer " + TOKENS.AccessToken
      : null;
  }

  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = async (error) => {
  const TOKENS = getTokens();
  const originalConfig = error.config;

  if (
    originalConfig.url !== BASE_URL + "/auth/token" &&
    error.response
  ) {
    if (
      error.response.status === 401 &&
      !originalConfig._retry &&
      refreshFlag
    ) {
      originalConfig._retry = true;
      refreshFlag = false;

      try {
        const rs = await axios.post(BASE_URL + "/auth/token", {
          RefreshToken: TOKENS ? TOKENS.RefreshToken : null,
        });

        setToken(JSON.stringify(rs.data));
        axiosInstance.defaults.headers["Authorization"] =
          "Bearer " + rs.data.AccessToken;
        originalConfig.headers["Authorization"] =
          "Bearer " + rs.data.AccessToken;

        refreshFlag = true;

        return axiosInstance(originalConfig);
      } catch (_error) {
        refreshFlag = true;
        logout();
        window.location.href = "/";

        return Promise.reject(_error);
      }
    }
  } else if (originalConfig.url === BASE_URL + "/auth/token") {
    logout();
    window.location.href = "/";
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
