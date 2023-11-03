import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward, IoIosPause, IoIosPlay } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FrameContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 24vw);
  grid-template-rows: repeat(4, 8vw) repeat(2, 2.25vw);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  transition: all 0.5s ease-in-out;
  user-select: none;
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
const CurationImageWrapper = styled.li`
  height: 100%;
  width: 100%;
  display: flex;
  flex: none;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  object-fit: contain;
`;
const CurationImage = styled.img`
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  text-overflow: ellipsis;
  white-space: wrap;
  font-size: max(1rem, 1.75vw);
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
  width: 100%;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  padding: 2vh;
  background: var(--maingradient);
`;
const MzDictionaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.25rem;
  border-radius: 99rem;
  white-space: nowrap;
  font-size: var(--font-size-xl);
  background-color: var(--white);
`;
const MzDictionaryText = styled.div`
  position: relative;
  padding: 0 1rem;
  white-space: nowrap;
  color: var(--aqua);
`;
const MzWordText = styled.div`
  position: relative;
  white-space: nowrap;
  font-size: var(--font-size-3xl);
  color: var(--white);
`;
const MzWordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 1rem;
  border-radius: 1rem;
  background-color: var(--dark02);
`;
const MzQuestionText = styled.div`
  position: relative;
  white-space: nowrap;
  font-size: var(--font-size-2xl);
  color: var(--dark02);
`;
const PlaceContainerWrapper = styled.li`
  width: 100%;
  display: flex;
  flex: none;
  background: var(--maingradient);
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
const PlaceText = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  white-space: wrap;
  font-size: var(--font-size-2xl-5);
  color: var(--dark02);
  z-index: 20;
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
const ArrowButton = styled.button<{ $hovered: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2vw;
  margin: 0 0 0 0.5vw;
  border-radius: 99vw;
  border: solid 0.15vw ${props => (props.$hovered ? "transparent" : "var(--gray03)")};
  background-color: ${props => (props.$hovered ? "var(--aqua)" : "")};
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
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
  height: 0.5vw;
  width: 3vw;
  margin: 0.5vw;
  background-color: ${props => (props.$active ? "var(--aqua50)" : "var(--gray03)")};
  transition: all 0.7s ease-in-out;
`;

interface TCarouselProps {
  curationImages: string[];
  curationTexts: string[];
  mzWords: string[];
  places: string[][];
}

function Carousel({ curationImages, curationTexts, mzWords, places }: TCarouselProps) {
  // 이미지를 좌우로 이동시키기 위한 현재 인덱스
  const [currentIndex, setCurrentIndex] = useState(1);

  // 무한 슬라이드를 위해 양 끝에 각각 마지막 요소과 첫 요소 붙여줄 배열
  const [currentCurationImages, setCurrentCurationImages] = useState<string[]>([]);
  const [currentCurationTexts, setCurrentCurationTexts] = useState<string[]>([]);
  const [currentMzWords, setCurrentMzWords] = useState<string[]>([]);
  const [currentPlaces, setCurrentPlaces] = useState<string[]>([]);

  // 캐러셀의 배열들을 보관하는 컨테이너에 useRef 지정
  const curationImagesRef = useRef<HTMLUListElement>(null);
  const curationTextsRef = useRef<HTMLUListElement>(null);
  const mzRef = useRef<HTMLUListElement>(null);
  const placeRef = useRef<HTMLUListElement>(null);

  // 버튼이 비활성화 상태인지 나타내는 상태
  const [isMoving, setIsMoving] = useState(false);
  const [hovered, setHovered] = useState({ left: false, right: false, play: false });
  const [playOn, setPlayOn] = useState(true);

  const carouselGroup = [curationImages, curationTexts, mzWords, places];
  const setCurrentFunctions = [
    setCurrentCurationImages,
    setCurrentCurationTexts,
    setCurrentMzWords,
    setCurrentPlaces,
  ];
  const refs = [curationImagesRef, curationTextsRef, mzRef, placeRef];

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
        const newData = [endData, ...thing, startData] as string[];
        setCurrentFunctions[idx](newData);
      }
    });
  }, [curationImages]);

  // 자동으로 5초마다 다음으로 넘어가기
  useEffect(() => {
    if (playOn === true) {
      const autoSlide = setInterval(() => {
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
      if (currentIndex === curationImages?.length + 1) {
        setCurrentIndex(1);
        refs.forEach(eleRef => setTransition(eleRef, ""));
      } else if (currentIndex === 0) {
        setCurrentIndex(curationImages?.length);
        refs.forEach(eleRef => setTransition(eleRef, ""));
      }
      setIsMoving(false); // 이동 완료
    };

    refs.forEach(eleRef => handleTransitionEventListener(eleRef, handleTransitionEnd, "add"));

    return () => {
      refs.forEach(eleRef => handleTransitionEventListener(eleRef, handleTransitionEnd, "remove"));
    };
  }, [currentIndex, curationImages]);

  // 이동할 방향(1이면 오른쪽으로, -1이면 왼쪽으로 이동)을 받아 해당 슬라이드로 이동시켜준다.
  const handleSwipe = (direction: number) => {
    // 슬라이드가 이동하는 동안에는 handleSwipe 함수가 작동하지 않도록 하여
    // 슬라이드가 완전히 이동하기 전에 인덱스가 추가로 변경되는 것을 방지합니다.
    // 사용자가 버튼을 빠르게 여러 번 클릭하더라도 인덱스가 배열 크기를 벗어나지 않게 됩니다.
    if (isMoving) return; // 이미 이동 중이면 함수 종료
    setIsMoving(true); // 이동 시작

    refs.forEach(eleRef => setTransition(eleRef, "all 0.7s ease-in-out"));

    setCurrentIndex(prev => prev + direction);
    console.log(currentIndex);
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
      $hovered={hovered[direction]}
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
              {currentCurationImages?.map(image => {
                return (
                  <CurationImageWrapper key={uuidv4()}>
                    <CurationImage src={image} />
                  </CurationImageWrapper>
                );
              })}
            </CurationImageContainerWrapper>
          </FrameCurationWrapper>
        </FrameCurationContainerWrapper>
        <FrameCurationText>
          <CurationTextContainerWrapper ref={curationTextsRef}>
            {currentCurationTexts?.map(text => {
              return (
                <CurationTextWrapper key={uuidv4()}>
                  <CurationText>{text}</CurationText>
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
                  <MzWrapper key={uuidv4()}>
                    <MzDictionaryWrapper>
                      <MzDictionaryText>MZ 사전</MzDictionaryText>
                    </MzDictionaryWrapper>
                    <MzWordWrapper>
                      <MzWordText>“ {word} ”</MzWordText>
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
                  return (
                    <PlaceContainerWrapper key={uuidv4()}>
                      <PlaceImage src={place[0]} />
                      <PlaceText>{place[1]}</PlaceText>
                    </PlaceContainerWrapper>
                  );
                })}
              </PlaceContainerOuterWrapper>
            </OtherContainerWrapper>
          </FrameOtherColWrapper>
        </FrameOtherWrapper>
        <DotWrapper>
          {curationImages.map((dot, index) => {
            return (
              <Dot
                $active={currentIndex - 1 === index}
                key={uuidv4() + dot}
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
