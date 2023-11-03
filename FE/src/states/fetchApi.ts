import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosRequestHeaders } from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchToken, logout, userState } from "../states/useLogin";
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

interface Ierror {
  httpStatus: string;
  code: string;
  message: string;
}
const user = useRecoilState(userState);

const userLogoutData = {
  accessToken: user[0].accessToken,
  refreshToken: user[0].refreshToken,
};

const refreshTokenData = {
  refreshToken: user[0].refreshToken,
};

export const fetchApi: AxiosInstance = axios.create();

fetchApi.interceptors.request.use(
  async (config): Promise<AdaptAxiosRequestConfig> => {
    const getAccessTokenForApi = await fetchToken(refreshTokenData);
    if (getAccessTokenForApi) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${getAccessTokenForApi}`;
    }
    return config;
  },
  (error: AxiosError<Ierror>) => {
    return Promise.reject(error);
  },
);

fetchApi.interceptors.response.use(
  response => response,
  async (error: AxiosError<Ierror>) => {
    const originalRequest = error.config as AdaptAxiosRequestConfig;
    if (error.response) {
      const errorCode = error.response.data.code;
      const errorMessage = error.response.data.message;
      let newAccessToken;
      switch (errorCode) {
        case "T-001":
          console.log(errorMessage);
          break;
        case "T-002":
          console.log(errorMessage);
          newAccessToken = await fetchToken(refreshTokenData);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return fetchApi(originalRequest);
        case "T-003":
          console.log(errorMessage);
          logout(userLogoutData);
          break;
        case "T-004":
          console.log(errorMessage);
          logout(userLogoutData);
          break;
        case "T-005":
          console.log(errorMessage);
          break;
        case "E-003":
          console.log(errorMessage);
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default fetchApi;
