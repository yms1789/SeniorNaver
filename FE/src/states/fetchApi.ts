// import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosRequestHeaders } from "axios";
// import { useRecoilState } from "recoil";
// import { fetchToken, useLogout, userState } from "./useUser";

// interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
//   headers: AxiosRequestHeaders;
// }

// interface Ierror {
//   httpStatus: string;
//   code: string;
//   message: string;
// }

// export const fetchApi: AxiosInstance = axios.create();

// fetchApi.interceptors.request.use(
//   async (config): Promise<AdaptAxiosRequestConfig> => {
//     const [user] = useRecoilState(userState);
//     const refreshTokenData = {
//       refreshToken: user.refreshToken,
//     };
//     const getAccessTokenForApi = await fetchToken(refreshTokenData);
//     if (getAccessTokenForApi) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${getAccessTokenForApi}`;
//     }
//     console.log("헤더설정완료");
//     return config;
//   },
//   (error: AxiosError<Ierror>) => {
//     return Promise.reject(error);
//   },
// );

// fetchApi.interceptors.response.use(
//   response => response,
//   async (error: AxiosError<Ierror>) => {
//     const [user] = useRecoilState(userState);
//     const userLogoutData = {
//       accessToken: user.accessToken,
//       refreshToken: user.refreshToken,
//     };

//     const logout = useLogout(userLogoutData);
//     const originalRequest = error.config as AdaptAxiosRequestConfig;
//     const refreshTokenData = {
//       refreshToken: user.refreshToken,
//     };
//     if (error.response) {
//       const errorCode = error.response.data.code;
//       const errorMessage = error.response.data.message;
//       let newAccessToken;
//       switch (errorCode) {
//         case "T-001":
//           console.log(errorMessage);
//           break;
//         case "T-002":
//           console.log(errorMessage);
//           newAccessToken = await fetchToken(refreshTokenData);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return fetchApi(originalRequest);
//         case "T-003":
//           console.log(errorMessage);
//           logout();
//           break;
//         case "T-004":
//           console.log(errorMessage);
//           logout();
//           break;
//         case "T-005":
//           console.log(errorMessage);
//           break;
//         case "E-003":
//           console.log(errorMessage);
//           break;
//       }
//     }
//     return Promise.reject(error);
//   },
// );
// export default fetchApi;
import { useEffect } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosRequestHeaders } from "axios";
import { useRecoilState } from "recoil";
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

export const useApiInterceptor = () => {
  const [user, setUser] = useRecoilState(userState);
  const userLogoutData = {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
  const logout = useLogout(userLogoutData);

  useEffect(() => {
    fetchApi.interceptors.request.use(
      async (config): Promise<AdaptAxiosRequestConfig> => {
        const refreshTokenData = {
          refreshToken: user.refreshToken,
        };
        const getAccessTokenForApi = await fetchToken(refreshTokenData);
        if (getAccessTokenForApi) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${getAccessTokenForApi}`;
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
        const refreshTokenData = {
          refreshToken: user.refreshToken,
        };
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
              logout();
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
  }, [user, logout]);
};

export default fetchApi;
