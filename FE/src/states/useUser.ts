import axios from "axios";
import { atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useCookies } from "react-cookie";
const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

const BaseURL = "/api";
interface UserInterface {
  memberId: string;
  nickname: string;
  email: string;
  mobile: string;
}

// 유저 정보를 담을 state를 생성
export const userState = atom<UserInterface>({
  key: "userInfo",
  default: {
    memberId: "",
    nickname: "",
    email: "",
    mobile: "",
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
  const [_, setCookie] = useCookies(["tokens"]);
  const login = async () => {
    const response = await axios.post("api/auth/login", userFormData);
    const { memberId, nickname, email, mobile, accessToken, refreshToken } = response.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("Current token: ", `Bearer ${accessToken}`); // 토큰 출력
    console.log("Current token when posting: ", axios.defaults.headers.common); // 요청 전 토큰 출력
    setCookie("tokens", { accessToken: accessToken, refreshToken: refreshToken });
    setUser({
      memberId,
      nickname,
      email,
      mobile,
    });
    setLogin(true);
  };
  return login;
};

// export const useLogout = (userLogoutData: { accessToken: string; refreshToken: string }) => {
//   const setUser = useSetRecoilState(userState);
//   const setLogin = useSetRecoilState(isLoggedInState);
//   const [, , removeCookie] = useCookies(["tokens"]);
//   async function logout() {
//     try {
//       console.log("logout refresh", userLogoutData.refreshToken);
//       const response = await axios.post("api/auth/logout", null, {
//         headers: {
//           Authorization: `Bearer ${userLogoutData.refreshToken}`,
//         },
//       });
//       if (response.status === 200) {
//         removeCookie("tokens");
//         setUser({
//           memberId: "",
//           nickname: "",
//           email: "",
//           mobile: "",
//         });
//         setLogin(false);
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   }
//   return logout;
// };

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
      nickname: "",
    });
    setLogin(true);
  };
  return naverLogin;
};

export const fetchToken = async (refreshToken: string) => {
  console.log(refreshToken);
  try {
    const response = await axios.post("api/token/reAccess", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
