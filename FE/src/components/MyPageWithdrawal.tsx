import { isLoggedInState, userState } from "../states/useUser";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const MyPageQuestionAndAnswerWrapper = styled.div`
  padding: 5vw 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`
const MyPageQuestionAndAnswerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 1.8vw;
  margin-bottom: 5vh;
`;

const MyPageQuestionAndAnswerform = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 1.8vw;
  margin-bottom: 5vh;
`;

const MyPageQuestionAndAnswerInput = styled.input`
  width: 45vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 1.8vw;
  margin-bottom: 5vh;
  border-radius: 20px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);

`;

const NextButton = styled.div`
  user-select: none;
  margin-top: 50px;
  width: 20vw;
  height: 8vh;
  background: #2e2e2e;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "NanumSquareNeoBold";
  font-size: 5vh;
  color: var(--white);
  cursor: pointer;
  &:hover {
    user-select: none;
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    user-select: none;
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;

function MyPageWithdrawal(){
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(userState);
    const [cookies] = useCookies(["tokens"]);
    const [, , removeCookie] = useCookies(["tokens"]);
    const navigate = useNavigate();

    async function handleLogout() {
      try {
        const response = await axios.post("api/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${cookies.tokens!.refreshToken}`,
          },
        });
  
        if (response.status === 200) {
          removeCookie("tokens");
          setUser({
            memberId: "",
            nickname: "",
            email: "",
            mobile: "",
          });
          setIsLoggedIn(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "성공적으로 탈퇴되었습니다.",
            showConfirmButton: false,
            timer: 1500,
            background: "var(--white)",
            color: "var(--dark01)",
            width: "600px",
            padding: "40px",
          });
          navigate("/home");

        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "회원탈퇴 실패.",
  
          showConfirmButton: false,
          timer: 1500,
          background: "var(--white)",
          color: "var(--dark01)",
          width: "500px",
        });
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data);
        }
      }
    }

  const handleWithdrawal = ()=>{
    Swal.fire({
      title: '회원 탈퇴를 진행하시겠어요?',
      text: '탈퇴하시면 모든 활동 기록이 삭제되며, 삭제된 기록은 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '진행하기',
      cancelButtonText: '닫기',
      background: "var(--white)",
      color: "var(--dark01)",
      width: "600px",
      padding: "40px",
      reverseButtons: true,
      customClass: {
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout()   
        } 
    })
  }

  return(
    <MyPageQuestionAndAnswerWrapper>
    <MyPageQuestionAndAnswerHeader>회원 탈퇴</MyPageQuestionAndAnswerHeader>
      <NextButton onClick={handleWithdrawal}>탈퇴하기</NextButton>
    </MyPageQuestionAndAnswerWrapper>
  )
}
 
export default MyPageWithdrawal;
