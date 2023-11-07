import { useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { BsFillMicFill, BsRecordCircle } from "react-icons/bs";
import { styled } from "styled-components";

// Create styled components
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
  background: ${props => (props.$onRec ? "white" : "var(--emerald)")};
  bottom: 0;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  text-align: center;
  z-index: 100;
  box-shadow: ${props =>
    props.$onRec ? "0 10px 25px -5px gray" : "0 10px 25px -5px var(--emerald)"};
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
  const [audioUrl, setAudioUrl] = useState<Blob>();

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.AudioContext)();

    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream: MediaStream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    console.log("녹음 시작");
    // 마이크 사용 권한 획득 후 녹음 시작
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
      analyser.onaudioprocess = function (e) {
        setOnRec(false);
      };
    });
  };
  const offRecAudio = async () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media!.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
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
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const onSubmitAudioFile = useCallback(() => {
    console.log(audioUrl);
    if (audioUrl) {
      console.log("audioUrl", window.URL.createObjectURL(audioUrl));
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl as BlobPart], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });
    console.log(sound); // File 정보 출력
  }, [audioUrl]);

  return (
    <FloatingContainer>
      {onRec ? (
        <FloatingButton onClick={onRecAudio} $onRec={!onRec}>
          <IconContext.Provider value={{ color: "black" }}>
            <BsFillMicFill size={40} />
          </IconContext.Provider>
        </FloatingButton>
      ) : (
        <FloatingButton
          onClick={() => {
            offRecAudio().then(() => {
              onSubmitAudioFile();
            });
          }}
          $onRec={!onRec}
        >
          <IconContext.Provider value={{ color: "red" }}>
            <BsRecordCircle size={40} color="red" />
          </IconContext.Provider>
        </FloatingButton>
      )}
      <button onClick={onSubmitAudioFile}>결과 확인</button>
    </FloatingContainer>
  );
}

export default ChatButton;
