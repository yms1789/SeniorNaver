import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { memeMineCurrentWordDetailState, memeCurrentTapState } from "../states/useMeme";
import { onErrorImg } from "../utils/utils";
import { IoIosArrowBack, IoIosArrowForward, IoIosPause, IoIosPlay } from "react-icons/io";

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeoExtraBold";
`;
const FrameContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 25vw);
  grid-template-rows: repeat(4, 8vw) repeat(2, 2.25vw);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  transition: all 0.3s ease-in-out;
  user-select: none;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 30vw);
    grid-template-rows: repeat(4, 8vw) repeat(2, 3vw);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 30vw);
    grid-template-rows: repeat(1, 50vw) repeat(1, 16vw) repeat(2, 50vw) repeat(1, 10vw);
  }
`;
const FrameCurationContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 5;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`;
const FrameCurationWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: space-between;
`;
const CurationImageContainerWrapper = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0rem;
`;
const CurationImageWrapper = styled.a`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex: none;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  &::after {
    content: "뉴스 바로가기↗";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw;
    font-size: 2vw;
    white-space: nowrap;
    color: var(--dark01);
    background: var(--maingradient);
    z-index: 1000;
    opacity: 0;
    transition: all 0.5s ease;
    @media (max-width: 768px) {
      font-size: 6vw;
    }
  }
  &:hover::after {
    opacity: 1;
  }
`;

const CurationImage = styled.img`
  width: auto;
  height: 100%;
  object-fit: contain;
  z-index: 10;
`;
const CurationBlurImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  scale: 1.05;
  object-fit: cover;
  opacity: 0.9;
  filter: blur(10px);
`;
const FrameCurationText = styled.div`
  height: 100%;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 6;
  display: flex;
  padding: 0;
  overflow: hidden;
  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`;
const CurationTextContainerWrapper = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0;
  justify-content: start;
`;
const CurationTextWrapper = styled.li`
  height: 100%;
  width: 100%;
  display: flex;
  flex: none;
`;
const CurationText = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.8vw;
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    white-space: wrap;
    font-size: 5.5vw;
  }
`;
const FrameOtherWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 5;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 5;
  }
`;
const FrameOtherColWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: 2rem;
  background: var(--gray03);
`;
const OtherContainerWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
`;
const MzWrapper = styled.li`
  cursor: pointer;
  width: 100%;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  padding: 2vh;
  background: var(--reversegradient);
  position: relative;
  &::after {
    content: "설명 바로가기↗";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw;
    font-size: 2vw;
    white-space: nowrap;
    color: var(--white);
    background: var(--dark02);
    z-index: 1000;
    opacity: 0;
    transition: all 0.5s ease;
    @media (max-width: 768px) {
      font-size: 6vw;
    }
  }
  &:hover::after {
    opacity: 1;
  }
  &:hover {
    background: var(--maingradient);
  }
`;

const MzDictionaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.25rem;
  border-radius: 99vw;
  white-space: nowrap;
  font-size: 1vw;
  background-color: var(--white);
  @media (max-width: 1280px) {
    padding: 0.5rem 0;
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    padding: 1vw 2vw;
    font-size: 4vw;
  }
`;
const MzDictionaryText = styled.div`
  position: relative;
  padding: 0 1vw;
  white-space: nowrap;
  color: var(--aqua);
`;
const MzWordText = styled.div`
  position: relative;
  white-space: nowrap;
  font-size: 2vw;
  color: var(--white);
  @media (max-width: 1280px) {
    font-size: 2.5vw;
  }
  @media (max-width: 768px) {
    font-size: 6vw;
  }
`;
const MzWordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.2vw 1vw;
  border-radius: 1vw;
  background-color: var(--dark02);
`;
const MzQuestionText = styled.div`
  position: relative;
  white-space: nowrap;
  font-size: 1.3vw;
  color: var(--dark02);
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;
const PlaceContainerWrapper = styled.a`
  width: 100%;
  display: flex;
  flex: none;
  &::after {
    content: "지도 바로가기↗";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw;
    font-size: 2vw;
    white-space: nowrap;
    color: var(--dark01);
    background: var(--maingradient);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.5s ease;
    @media (max-width: 768px) {
      font-size: 6vw;
    }
  }
  &:hover::after {
    opacity: 1;
  }
`;
const PlaceContainerOuterWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
`;
const PlaceImage = styled.img`
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const PlaceTextWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
`;
const PlaceTextGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  border-radius: 3vw 0 0 0;
  gap: 0.2vw;
  padding: 0.5vw 1vw;
  background: linear-gradient(150deg, #0000003e, #000000);
`;
const PlaceText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1vw;
  color: var(--white);
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;
const PlaceTextTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 2vw;
  color: var(--aqua02);
  @media (max-width: 1280px) {
    font-size: 2.5vw;
  }
  @media (max-width: 768px) {
    font-size: 7vw;
  }
`;
const CarouselControlWrapper = styled.div`
  width: 100%;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 6;
  grid-row-end: 7;
  display: flex;
  align-items: end;
  justify-content: end;
`;
const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2vw;
  margin: 0 0 0 0.5vw;
  border-radius: 99vw;
  border: solid 0.15vw var(--gray03);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
    border: solid 0.15vw transparent;
    background: var(--transgradient);
  }
  @media (max-width: 768px) {
    scale: 3;
    margin: 4vw;
  }
`;
const DotWrapper = styled.div`
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  display: flex;
  justify-content: flex-start;
`;
const Dot = styled.div<{ $active: boolean }>`
  cursor: pointer;
  height: 0.5vw;
  width: 3vw;
  margin: 0.5vw;
  background: ${props => (props.$active ? "var(--transgradient)" : "var(--gray03)")};
  transition: all 0.7s ease-in-out;
`;

interface TResponseData {
  curations: { imageUrl: string; link: string; title: string }[];
  mzWords: { word: string; wordId: number }[];
  places: {
    firstimage: string;
    addr1: string;
    title: string;
    contentid: string;
  }[];
}
function Carousel({ curations, mzWords, places }: TResponseData) {
  const setCurrentTab = useSetRecoilState(memeCurrentTapState);
  const setcurrentWord = useSetRecoilState(memeMineCurrentWordDetailState);

  // 이미지를 좌우로 이동시키기 위한 현재 인덱스
  const [currentIndex, setCurrentIndex] = useState(1);

  // 무한 슬라이드를 위해 양 끝에 각각 마지막 요소과 첫 요소 붙여줄 배열
  const [currentCuration, setCurrentCuration] = useState<string[][]>([]);
  const [currentMzWords, setCurrentMzWords] = useState<string[][]>([]);
  const [currentPlaces, setCurrentPlaces] = useState<string[][]>([]);

  // 캐러셀의 배열들을 보관하는 컨테이너에 useRef 지정
  const curationImagesRef = useRef<HTMLUListElement>(null);
  const curationTextsRef = useRef<HTMLUListElement>(null);
  const mzRef = useRef<HTMLUListElement>(null);
  const placeRef = useRef<HTMLUListElement>(null);

  // 버튼이 비활성화 상태인지 나타내는 상태
  const [isMoving, setIsMoving] = useState(false);
  const [hovered, setHovered] = useState({ left: false, right: false, play: false });
  const [playOn, setPlayOn] = useState(true);

  const carouselGroup = [curations, mzWords, places];
  const setCurrentFunctions = [setCurrentCuration, setCurrentMzWords, setCurrentPlaces];
  const refs = [curationImagesRef, curationTextsRef, mzRef, placeRef];

  const handleSetState = (index: number) => {
    console.log(index);
    setCurrentTab({ currentPage: 4 });
    setcurrentWord({ currentWord: index });
    window.open("/meme", "_blank");
  };

  const setTransform = (ref: React.RefObject<HTMLElement>, value: string): void => {
    if (ref.current !== null) {
      ref.current.style.transform = value;
    }
  };

  const setTransition = (ref: React.RefObject<HTMLElement>, value: string): void => {
    if (ref.current !== null) {
      ref.current.style.transition = value;
    }
  };

  const handleTransitionEventListener = (
    ref: React.RefObject<HTMLElement>,
    handler: () => void,
    type: "add" | "remove",
  ): void => {
    if (ref.current !== null) {
      ref.current[`${type}EventListener`]("transitionend", handler);
    }
  };

  // 마지막 슬라이드에서 첫번쨰 슬라이드로 자연스럽게 넘어가는 효과 준다.
  useEffect(() => {
    carouselGroup.forEach((thing, idx) => {
      if (thing?.length !== 0) {
        const startData = thing[0];
        const endData = thing[thing?.length - 1];
        const newData = [
          Object.values(endData) as string[],
          ...thing.map(item => Object.values(item) as string[]),
          Object.values(startData) as string[],
        ];
        setCurrentFunctions[idx](newData);
      }
    });
  }, [curations]);

  // 자동으로 5초마다 다음으로 넘어가기
  useEffect(() => {
    if (playOn === true) {
      const autoSlide = setTimeout(() => {
        handleSwipe(1);
      }, 3000);
      return () => {
        clearInterval(autoSlide);
      };
    }
  }, [playOn, isMoving]);

  // currentIndex가 변경될 때마다 translateX를 이용해 슬라이드를 이동한다
  useEffect(() => {
    const translateValue = `translateX(-${currentIndex}00%)`;
    refs.forEach(eleRef => setTransform(eleRef, translateValue));
  }, [currentIndex]);

  // setTimeout의 지연 시간과 transition의 지속 시간이 정확히 일치하지 않을 수 있다
  // 이 둘의 시간이 정확히 일치하지 않으면, transition이 아직 끝나지 않은 상태에서 transition을 없애려고 하기 때문에 부자연스러운 화면 전환이 발생할 수 있다.
  // transitionend 이벤트를 사용하여 transition이 완전히 끝난 후에 transition을 없애고 슬라이드를 이동시키자.
  // transition의 지속 시간을 정확히 알 수 없어도 transition이 끝난 시점을 정확히 알 수 있으므로 부자연스러운 화면 전환이 없어질 것입니다.
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === curations?.length + 1) {
        setCurrentIndex(1);
        refs.forEach(eleRef => setTransition(eleRef, ""));
      } else if (currentIndex === 0) {
        setCurrentIndex(curations?.length);
        refs.forEach(eleRef => setTransition(eleRef, ""));
      }
      setIsMoving(false); // 이동 완료
    };

    refs.forEach(eleRef => handleTransitionEventListener(eleRef, handleTransitionEnd, "add"));

    return () => {
      refs.forEach(eleRef => handleTransitionEventListener(eleRef, handleTransitionEnd, "remove"));
    };
  }, [currentIndex, curations]);

  // 이동할 방향(1이면 오른쪽으로, -1이면 왼쪽으로 이동)을 받아 해당 슬라이드로 이동시켜준다.
  const handleSwipe = (direction: number) => {
    // 슬라이드가 이동하는 동안에는 handleSwipe 함수가 작동하지 않도록 하여
    // 슬라이드가 완전히 이동하기 전에 인덱스가 추가로 변경되는 것을 방지합니다.
    // 사용자가 버튼을 빠르게 여러 번 클릭하더라도 인덱스가 배열 크기를 벗어나지 않게 됩니다.
    if (isMoving) return; // 이미 이동 중이면 함수 종료
    setIsMoving(true); // 이동 시작

    refs.forEach(eleRef => setTransition(eleRef, "all 0.7s ease-in-out"));

    setCurrentIndex(prev => prev + direction);
    // console.log(currentIndex);
  };

  const handleHover = (key: string, value: boolean) => {
    setHovered(prev => ({ ...prev, [key]: value }));
  };

  const renderArrowButton = (
    direction: "left" | "right" | "play",
    action: () => void,
    icon: JSX.Element,
  ) => (
    <ArrowButton
      onMouseEnter={() => handleHover(direction, true)}
      onMouseLeave={() => handleHover(direction, false)}
      onClick={action}
    >
      {hovered[direction]
        ? React.cloneElement(icon, { size: "2vw", color: "var(--white)" })
        : React.cloneElement(icon, { size: "2vw", color: "var(--dark30)" })}
    </ArrowButton>
  );

  return (
    <CarouselWrapper>
      <FrameContainerWrapper>
        <FrameCurationContainerWrapper>
          <FrameCurationWrapper>
            <CurationImageContainerWrapper ref={curationImagesRef}>
              {currentCuration?.map(curation => {
                return (
                  <CurationImageWrapper
                    key={self.crypto.randomUUID()}
                    href={curation[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CurationImage
                      src={curation[0]}
                      alt="CurationImage"
                      onError={onErrorImg}
                      referrerPolicy="no-referrer"
                    />
                    <CurationBlurImage
                      src={curation[0]}
                      alt="CurationImage"
                      onError={onErrorImg}
                      referrerPolicy="no-referrer"
                    />
                  </CurationImageWrapper>
                );
              })}
            </CurationImageContainerWrapper>
          </FrameCurationWrapper>
        </FrameCurationContainerWrapper>
        <FrameCurationText>
          <CurationTextContainerWrapper ref={curationTextsRef}>
            {currentCuration?.map(curation => {
              return (
                <CurationTextWrapper key={self.crypto.randomUUID()}>
                  <CurationText>{curation[1].replace(/<\/?b>|<br\s*\/?>/gi, "")}</CurationText>
                </CurationTextWrapper>
              );
            })}
          </CurationTextContainerWrapper>
        </FrameCurationText>
        <FrameOtherWrapper>
          <FrameOtherColWrapper>
            <OtherContainerWrapper ref={mzRef}>
              {currentMzWords?.map(word => {
                return (
                  <MzWrapper
                    key={self.crypto.randomUUID()}
                    onClick={() => handleSetState(parseInt(word[1]))}
                  >
                    <MzDictionaryWrapper>
                      <MzDictionaryText>MZ 사전</MzDictionaryText>
                    </MzDictionaryWrapper>
                    <MzWordWrapper>
                      <MzWordText>“ {word[0].slice(0, 12)} ”</MzWordText>
                    </MzWordWrapper>
                    <MzQuestionText>이 말의 뜻은?</MzQuestionText>
                  </MzWrapper>
                );
              })}
            </OtherContainerWrapper>
          </FrameOtherColWrapper>
          <FrameOtherColWrapper>
            <OtherContainerWrapper ref={placeRef}>
              <PlaceContainerOuterWrapper>
                {currentPlaces?.map(place => {
                  const placeTextTitle = place[2].split(/[(\[].*/)[0].slice(0, 13);
                  return (
                    <PlaceContainerWrapper
                      key={self.crypto.randomUUID()}
                      href={`travel/${place[3]}`}
                      target="_blank"
                    >
                      <PlaceImage
                        src={place[0]}
                        alt="PlaceImage"
                        onError={onErrorImg}
                        referrerPolicy="no-referrer"
                      />
                      <PlaceTextWrapper>
                        <PlaceTextGroupWrapper>
                          <PlaceText>{place[1]}</PlaceText>
                          <PlaceTextTitle>{placeTextTitle}</PlaceTextTitle>
                        </PlaceTextGroupWrapper>
                      </PlaceTextWrapper>
                    </PlaceContainerWrapper>
                  );
                })}
              </PlaceContainerOuterWrapper>
            </OtherContainerWrapper>
          </FrameOtherColWrapper>
        </FrameOtherWrapper>
        <DotWrapper>
          {curations.map((dot, index) => {
            return (
              <Dot
                $active={currentIndex - 1 === index}
                key={self.crypto.randomUUID() + dot}
                onClick={() => {
                  setCurrentIndex(index + 1);
                }}
              />
            );
          })}
        </DotWrapper>
        <CarouselControlWrapper>
          {renderArrowButton("left", () => handleSwipe(-1), <IoIosArrowBack />)}
          {renderArrowButton(
            "play",
            () => setPlayOn(!playOn),
            playOn ? <IoIosPause /> : <IoIosPlay />,
          )}
          {renderArrowButton("right", () => handleSwipe(1), <IoIosArrowForward />)}
        </CarouselControlWrapper>
      </FrameContainerWrapper>
    </CarouselWrapper>
  );
}

export default Carousel;
