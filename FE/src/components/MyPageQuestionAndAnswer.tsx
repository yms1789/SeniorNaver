import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

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

const NextButton = styled.input`
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


function MyPageQuestionAndAnswer(){

  const [submitText,setSubmitText] = useState("")

  const handleChange = (e:any) => {
    setSubmitText(e.target.value);
  }

  const handleSubmit= (e:any)=>{
    e.preventDefault();
    if (!submitText) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "모든 항목을 작성하세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "600px",
        padding: "30px"
      });
    } else {
      Swal.fire({
        title: '문의를 보내시겠습니까?',
        text: '문의된 내용은 담당자가 검토 후 답변 드리겠습니다.',
        icon: 'warning',
        background: "var(--white)",
        color: "var(--dark01)",
        width: "600px",
        padding: "40px",
        showCancelButton: true,
        confirmButtonText: '진행하기',
        cancelButtonText: '닫기',
        reverseButtons: true,
        customClass: {
          confirmButton: 'confirm-button-class',
          cancelButton: 'cancel-button-class'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "성공적으로 제출되었습니다.",
            showConfirmButton: false,
            timer: 1500,
            background: "var(--white)",
            color: "var(--dark01)",
            width: "600px",
            padding: "40px",
          });
          setSubmitText(''); // 제출 후 입력 필드를 비워줍니다.
        } 
      })
    }
    }
  

    return(
      <MyPageQuestionAndAnswerWrapper>
      <MyPageQuestionAndAnswerHeader>문의하기</MyPageQuestionAndAnswerHeader>
      <MyPageQuestionAndAnswerform onSubmit={handleSubmit}>
        <MyPageQuestionAndAnswerInput type="text" value={submitText} onChange={handleChange}></MyPageQuestionAndAnswerInput>
        <NextButton type="submit" value={"제출"}></NextButton>
      </MyPageQuestionAndAnswerform>
      </MyPageQuestionAndAnswerWrapper>
    )
}
 
export default MyPageQuestionAndAnswer;
