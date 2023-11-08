import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BsFillMicFill, BsRecordCircle } from "react-icons/bs";
import { styled } from "styled-components";

const FloatingContainer = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  margin: 35px 25px;
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
  const [audioUrl, setAudioUrl] = useState<any>();
  const [responseAudioUrl, setResponseAudioUrl] = useState<any>();
  // const [audio, setAudio] = useState<Blob>();
  const audioRef = useRef<HTMLAudioElement>(null);

  // function base64ToBlob(base64: any, fileType: string) {
  //   let typeHeader = "data:application/" + fileType + ";base64,"; // base64 헤더 파일 유형 정의
  //   let audioSrc = typeHeader + base64;
  //   let arr = audioSrc.split(",");
  //   let array = arr[0].match(/:(.*?);/);
  //   let mime = (array && array.length > 1 ? array[1] : fileType) || fileType;
  //   // url헤더 제거하고 btye로 변환
  //   let bytes = window.atob(arr[1]);
  //   // 예외를 처리하고 0보다 작은 ASCII 코드를 0보다 큰 값으로 변환
  //   let ab = new ArrayBuffer(bytes.length);
  //   // 뷰 생성(메모리에 직접): 8비트 부호 없는 정수, 길이 1바이트
  //   let ia = new Uint8Array(ab);
  //   for (let i = 0; i < bytes.length; i++) {
  //     ia[i] = bytes.charCodeAt(i);
  //   }
  //   return new Blob([ab], {
  //     type: mime,
  //   });
  // }
  async function sendAudio(file: File) {
    try {
      const formData = new FormData();
      // formData.append(
      //   "audio.mp3",
      //   new Blob([JSON.stringify(file)], {
      //     type: "audio/mp3",
      //   }),
      // );
      console.log("file", file);
      formData.append("voiceFile", file);
      const response = await axios.post("/api/chatbot/v1/talk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      console.log("resBlob", blob);
      const blobUrl = URL.createObjectURL(blob);
      console.log(blobUrl);
      // setAudioUrl(blobUrl);
      // const audioElement = new Audio();
      // audioElement.src = blobUrl;
      // setResponseAudioUrl(blobUrl);
      // audioElement.volume = 0.5;
      // audioElement.play();
      // base64ToBlob(response.data, 'mp3');
      // setAudio(base64ToBlob(response.data, "mp3"));
    } catch (error) {
      console.log(error);
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
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };
  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음

    media!.ondataavailable = function (e: any) {
      console.log(e.data);
      setAudioUrl(e.data);
      console.log(URL.createObjectURL(e.data));
      setOnRec(true);
      const sound = new File([e.data], "sample.mp3", {
        lastModified: new Date().getTime(),
        type: "audio/mpeg",
      });
      // console.log("sound", sound);
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

    // if (audioUrl) {
    //   console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    // }

    // File 생성자를 사용해 파일로 변환
    // const sound = new File([audioUrl], "sample.mp3", {
    //   lastModified: new Date().getTime(),
    //   type: "audio/mpeg",
    // });

    // 😀😀😀
    // console.log(sound); // File 정보 출력
    // sendAudio(sound);
  };
  // useEffect(() => {
  //   if (audio) {
  //     // MPEG 바이너리 데이터를 사용하여 Blob을 생성
  //     console.log(audio);
  //     // const blob = new Blob([audio], { type: "audio/mpeg" });

  //     // Blob을 URL로 변환
  //     const responseAudioURL = URL.createObjectURL(audio);
  //     console.log("response", responseAudioURL);
  //     console.log(audioRef.current);
  //     audioRef.current.src = responseAudioURL;
  //     // 오디오 요소에 URL 설정
  //     // 오디오 재생
  //     // audioRef.current.play();
  //   }
  // }, [audio]);

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
      {responseAudioUrl && <audio ref={audioRef} src={responseAudioUrl} controls />}
      {audioUrl && <audio src={URL.createObjectURL(audioUrl)} controls></audio>}
    </>
  );
}

export default ChatButton;
