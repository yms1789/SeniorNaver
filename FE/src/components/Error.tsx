import { styled } from "styled-components";
import { FallbackProps } from "react-error-boundary";
const ErrorButton = styled.button``;
const ErrorText = styled.p``;

function Error({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className=" flex flex-col items-center justify-center px-3 pt-52">
      <ErrorText>{error.message}</ErrorText>
      <ErrorButton onClick={() => resetErrorBoundary()}>reset</ErrorButton>
      <ErrorText className=" mt-4">
        <strong className=" text-sky-400">잠시</strong> 기다려주세요
      </ErrorText>
    </div>
  );
}

export default Error;
