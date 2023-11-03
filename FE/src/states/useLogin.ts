import { atom } from "recoil";
import axios from "axios";

const BaseURL = "/api";
interface UserInterface {
  memberId: string;
  nickname: string;
  email: string;
  mobile: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: string;
}

export const userState = atom<UserInterface>({
  key: "userInfo",
  default: {
    memberId: "",
    nickname: "",
    email: "",
    mobile: "",
    accessToken: "",
    refreshToken: "",
    refreshTokenExpirationTime: "",
  },
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false,
});

export const login = async (userFormData: { memberId: string; password: string }) => {
  const response = await axios.post("api/auth/login", userFormData);
  const {
    memberId,
    nickname,
    email,
    mobile,
    accessToken,
    refreshToken,
    refreshTokenExpirationTime,
  } = response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return {
    memberId,
    nickname,
    email,
    mobile,
    accessToken,
    refreshToken,
    refreshTokenExpirationTime,
  };
};

export const naverLogin = async () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const state = new URLSearchParams(window.location.search).get("state");
  const registrationId = "naver";
  const response = await axios.post(
    `${BaseURL}/oauth/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
  );
  const { memberId, email, mobile, accessToken, refreshToken, refreshTokenExpirationTime } =
    response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return {
    memberId,
    email,
    mobile,
    accessToken,
    refreshToken,
    refreshTokenExpirationTime,
    nickname: "",
  };
};

export const logout = async (userLogoutData: { accessToken: string; refreshToken: string }) => {
  try {
    await axios.post("api/auth/logout", userLogoutData);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const fetchToken = async (refreshTokenData: { refreshToken: string }) => {
  try {
    const response = await axios.post("api/token/reissue", {
      headers: {
        Authorization: `Bearer ${refreshTokenData}`,
      },
    });
    const { aceesstoken } = response.data;
    localStorage.setItem("aceesstoken", aceesstoken);
    return {
      aceesstoken,
    };
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
