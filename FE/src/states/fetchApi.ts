import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { fetchToken, useLogout } from "./useUser";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

interface Ierror {
  httpStatus: string;
  errorCode: string;
  errorMessage: string;
}

export const fetchApi: AxiosInstance = axios.create();
fetchApi.interceptors.request.use(
  async (config): Promise<AdaptAxiosRequestConfig> => {
    const persistData = JSON.parse(sessionStorage.getItem("recoil-persist") || "{}"); // 세션 저장소에서 토큰 액세스
    const user = persistData.userInfo;
    if (user.accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = config.headers.Authorization || `Bearer ${user.accessToken}`; // 현재 토큰을 헤더에 설정
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
    const persistData = JSON.parse(sessionStorage.getItem("recoil-persist") || "{}"); // 세션 저장소에서 토큰 액세스
    const user = persistData.userInfo;
    const refreshTokenData = {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };

    if (error.response) {
      const errorCode = error.response.data.errorCode;
      const errorMessage = error.response.data.errorMessage;
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
          await useLogout(refreshTokenData)();
          break;
        case "T-004":
          console.log(errorMessage);
          await useLogout(refreshTokenData)();
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
// import axios, { AxiosInstance } from "axios";
// import { fetchToken, useLogout, userState } from "./useUser";

// const fetchApi = (): AxiosInstance => {
//   const user = JSON.parse(sessionStorage.getItem("userInfo") || "{}"); // 로컬 저장소에서 토큰 액세스
//   const refreshTokenData = {
//     accessToken: user.accessToken,
//     refreshToken: user.refreshToken,
//   };
//   const logout = useLogout(refreshTokenData);
//   const axiosInstance = axios.create({
//     // baseURL: "http://127.0.0.1:8000/",
//     headers: {
//       Authorization: `Bearer ${refreshTokenData.accessToken}`,
//     },
//   });

//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       const statusCode = error.response?.status;
//       if (statusCode === 401) {
//         error.response.statusText = "Unauthorized";
//         error.response.status = 401;
//         logout();
//       }
//       return Promise.reject(error);
//     },
//   );

//   return axiosInstance;
// };

// export default fetchApi;
