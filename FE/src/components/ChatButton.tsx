import axios from "axios";
import { useState } from "react";
import { IconContext } from "react-icons";
import { BsFillMicFill, BsRecordCircle } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import records from "../states/records";
import fetchApi from "../states/fetchApi";
import { isLoggedInState } from "../states/useUser";

const FloatingContainer = styled.div`
  @media screen and (max-width: 450px) {
    bottom: 100px;
  }
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 50px;
  right: 10px;

  &:hover {
    height: 300px;
  }
  &:hover .floating-button {
    box-shadow: 0 10px 25px var(--emerald);
    transform: translateY(5px);
    transition: all 0.3s;
  }
`;

const FloatingButton = styled.div<{ $onRec: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  background: ${props => (props.$onRec ? "var(--emerald)" : "white")};
  bottom: 0;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  text-align: center;
  z-index: 100;
  box-shadow: ${props =>
    props.$onRec ? "0 10px 25px -5px var(--emerald)" : "0 10px 25px -5px gray"};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(5px);
  }
`;

function ChatButton() {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [analyser, setAnalyser] = useState<ScriptProcessorNode>();
  const setIsRecording = useSetRecoilState(records);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  async function sendAudio(file: File) {
    try {
      const formData = new FormData();

      formData.append("voiceFile", file);
      const response = !isLoggedIn
        ? await axios.post("/api/chatbot/v1/talk", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          })
        : await fetchApi.post("/api/chatbot/v1/talk", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          });
      setIsRecording(false);
      const blobUrl = URL.createObjectURL(response.data);
      const audioElement = new Audio();
      audioElement.src = blobUrl;
      audioElement.volume = 0.5;
      audioElement.play();
    } catch (error) {
      setIsRecording(false);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  }
  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new window.AudioContext();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream: MediaStream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 60) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setIsRecording(true);
            setOnRec(true);
          };
        } else {
          setIsRecording(false);
          setOnRec(false);
        }
      };
    });
  };
  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음

    media!.ondataavailable = function (e: any) {
      setOnRec(true);
      setIsRecording(true);
      const sound = new File([e.data], "sample.mp3", {
        lastModified: new Date().getTime(),
        type: "audio/mpeg",
      });
      sendAudio(sound);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream!.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media!.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser!.disconnect();
    source!.disconnect();
  };

  return (
    <>
      <FloatingContainer>
        {onRec ? (
          <FloatingButton onClick={onRecAudio} $onRec={onRec}>
            <IconContext.Provider value={{ color: "black" }}>
              <BsFillMicFill size={40} />
            </IconContext.Provider>
          </FloatingButton>
        ) : (
          <FloatingButton onClick={offRecAudio} $onRec={onRec}>
            <IconContext.Provider value={{ color: "red" }}>
              <BsRecordCircle size={40} color="red" />
            </IconContext.Provider>
          </FloatingButton>
        )}
      </FloatingContainer>
    </>
  );
}

export default ChatButton;
