import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchToken } from "./useUser";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

interface Ierror {
  httpStatus: string;
  errorCode: string;
  errorMessage: string;
}

const fetchApi: AxiosInstance = axios.create();

function useAxiosInterceptor() {
  const [cookies, setCookies] = useCookies(["tokens"]);
  const requestHandler = (config: any) => {
    config.headers = config.headers || {};
    config.headers.Authorization = config.headers.Authorization
      ? config.headers.Authorization
      : cookies.tokens
      ? `Bearer ${cookies.tokens.accessToken}`
      : "";
    return config;
  };

  const requestInterceptor = fetchApi.interceptors.request.use(
    requestHandler,
    (error: AxiosError<Ierror>) => {
      return Promise.reject(error);
    },
  );

  const responseInterceptor = fetchApi.interceptors.response.use(
    response => response,
    async (error: AxiosError<Ierror>) => {
      const originalRequest = error.config as AdaptAxiosRequestConfig;
      if (error.response) {
        const errorCode = error.response.data.errorCode;
        const errorMessage = error.response.data.errorMessage;
        switch (errorCode) {
          case "T-001":
            break;
          case "A-001":
            const newAccessToken = await fetchToken(cookies.tokens.refreshToken);
            setCookies("tokens", { ...cookies.tokens, accessToken: newAccessToken });
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return fetchApi(originalRequest);
          case "A-002":
            break;
          case "T-004":
            console.log(errorMessage);
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

  useEffect(() => {
    return () => {
      fetchApi.interceptors.request.eject(requestInterceptor);
      fetchApi.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}
export { fetchApi, useAxiosInterceptor };
