import { atom } from "recoil";
import axios from "axios";
import { recoilPersist } from "recoil-persist";
import { useSetRecoilState, useRecoilState } from "recoil";
const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

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

// 유저 정보를 담을 state를 생성
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
  effects_UNSTABLE: [persistAtom],
});

// 로그인 여부를 판단하는 스테이트
export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 요청이 성공하면, setUser로 유저 정보를 담는다.
export const useLogin = (userFormData: { memberId: string; password: string }) => {
  const setUser = useSetRecoilState(userState);
  const setLogin = useSetRecoilState(isLoggedInState);

  const login = async () => {
    const response = await axios.post("api/auth/login", userFormData);
    const { memberId, nickname, email, mobile, accessToken, refreshToken } = response.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("Current token: ", `Bearer ${accessToken}`); // 토큰 출력
    console.log("Current token when posting: ", axios.defaults.headers.common); // 요청 전 토큰 출력

    setUser({
      memberId,
      nickname,
      email,
      mobile,
      accessToken,
      refreshToken,
      refreshTokenExpirationTime: "",
    });
    setLogin(true);
  };
  return login;
};

export const useLogout = (userLogoutData: { accessToken: string; refreshToken: string }) => {
  const setUser = useSetRecoilState(userState);
  const setLogin = useSetRecoilState(isLoggedInState);
  const logout = async () => {
    try {
      await axios.post("api/auth/logout", userLogoutData);
      setUser({
        memberId: "",
        nickname: "",
        email: "",
        mobile: "",
        accessToken: "",
        refreshToken: "",
        refreshTokenExpirationTime: "",
      });
      setLogin(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return logout;
};

export const useNaverLogin = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const state = new URLSearchParams(window.location.search).get("state");
  const setUser = useSetRecoilState(userState);
  const setLogin = useSetRecoilState(isLoggedInState);
  const registrationId = "naver";
  const naverLogin = async () => {
    const response = await axios.post(
      `${BaseURL}/oauth/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
    );
    const { memberId, email, mobile, accessToken } = response.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setUser({
      memberId,
      email,
      mobile,
      accessToken: "",
      refreshToken: "",
      refreshTokenExpirationTime: "",
      nickname: "",
    });
    setLogin(true);
  };
  return naverLogin;
};

export const fetchToken = async (refreshTokenData: { refreshToken: string }) => {
  console.log("패치토큰요청?");

  try {
    const response = await axios.post("api/token/reissue", {
      headers: {
        Authorization: `Bearer ${refreshTokenData}`,
      },
    });
    const { accessToken } = response.data;
    console.log("패치토큰성공?");
    return {
      accessToken,
    };
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
