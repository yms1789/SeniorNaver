import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosRequestHeaders } from "axios";
import { fetchToken, useLogout, userState } from "./useUser";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

interface Ierror {
  httpStatus: string;
  code: string;
  message: string;
}

export const fetchApi: AxiosInstance = axios.create();
fetchApi.interceptors.request.use(
  async (config): Promise<AdaptAxiosRequestConfig> => {
    const persistData = JSON.parse(sessionStorage.getItem("recoil-persist") || "{}"); // 세션 저장소에서 토큰 액세스
    const user = persistData.userInfo;
    if (user && user.accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${user.accessToken}`; // 현재 토큰을 헤더에 설정
    }
    console.log("헤더설정완료");
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
    const user = JSON.parse(sessionStorage.getItem("userInfo") || "{}"); // 세션 저장소에서 토큰 액세스
    const refreshTokenData = {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
    const logout = useLogout(refreshTokenData);

    if (error.response) {
      const errorCode = error.response.data.code;
      const errorMessage = error.response.data.message;
      let newAccessToken;
      switch (errorCode) {
        case "T-001":
          console.log(errorMessage);
          break;
        case "A-001":
          console.log(errorMessage);
          newAccessToken = await fetchToken(refreshTokenData);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return fetchApi(originalRequest);
        case "A-002":
          console.log(errorMessage);
          // logout();
          break;
        case "T-004":
          console.log(errorMessage);
          logout();
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
