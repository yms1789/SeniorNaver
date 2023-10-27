import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Dot = styled.div`
  height: 1rem;
  width: 1rem;
  background-color: var(--gray01);
  border-radius: 50%;
  margin: 0.5rem;
`;
const DotWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
const ArrowButtonPrev = styled.button`
  height: 5rem;
  width: 5rem;
  border-radius: 99rem;
  background-color: var(--gray03);
`;
const ArrowButtonNext = styled.button`
  height: 5rem;
  width: 5rem;
  border-radius: 99rem;
  background-color: var(--gray03);
`;
const CurationImage = styled.img`
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const CurationImageWrapper = styled.li`
  align-self: stretch;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  object-fit: contain;
`;
const CurationImageContainerWrapper = styled.ul`
  display: flex;
  padding: 0rem;
  height: 64vh;
  width: 100%;
`;
const CurationTextWrapper = styled.div`
  align-self: stretch;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const FrameCurationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  overflow: hidden;
  background-color: #ff0000;
`;
const MzDictionaryText = styled.div`
  position: relative;
  background: var(--maingradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 1rem;
  white-space: nowrap;
`;
const MzDictionaryWrapper = styled.div`
  border-radius: 99rem;
  font-size: var(--font-size-2xl);
  background-color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  white-space: nowrap;
`;
const MzWordText = styled.div`
  position: relative;
  white-space: nowrap;
  font-size: var(--font-size-4xl);
`;
const MzWordWrapper = styled.div`
  border-radius: 1rem;
  background-color: var(--dark02);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;
const MzQuestionText = styled.div`
  position: relative;
  color: var(--dark02);
  white-space: nowrap;
  font-size: var(--font-size-2xl-5);
`;
const FrameMzWrapper = styled.div`
  align-self: stretch;
  flex: 1;
  background: var(--maingradient);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const FramePlace = styled.div`
  align-self: stretch;
  flex: 1;
  position: relative;
  background-color: var(--gray03);
  overflow: hidden;
`;
const FrameOtherWrapper = styled.div`
  height: 70vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  color: var(--white);
`;
const FrameContainerWrapper = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  background-color: #7d0909;
  min-width: 40rem;
  max-width: 80vw;
  transition: all 0.5s ease-in-out;
`;
const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: end;
  justify-content: center;
  gap: 1rem;
  background-color: var(--gray02);
  font-size: var(--font-size-2xl-5);
`;

interface CarouselProps {
  images: string[];
}

function Carousel({ images }: CarouselProps) {
  // 이미지를 좌우로 이동시키기 위한 현재 인덱스
  const [currentIndex, setCurrentIndex] = useState(1);

  // 무한 슬라이드를 위해 양 끝에 각각 마지막 사진과 첫 사진을 붙여줄 배열
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // 캐러셀의 사진배열들을 보관하는 컨테이너에 useRef 지정
  const carouselRef = useRef<HTMLUListElement>(null);

  // 버튼이 비활성화 상태인지 나타내는 상태
  const [isMoving, setIsMoving] = useState(false);

  // 마지막 슬라이드에서 첫번쨰 슬라이드로 자연스럽게 넘어가는 효과 준다.
  useEffect(() => {
    if (images?.length !== 0) {
      const startData = images[0];
      const endData = images[images?.length - 1];
      const newData = [endData, ...images, startData];

      setCurrentImages(newData);
    }
    console.log("데이타 재설정", currentImages);
  }, [images]);

  // currentIndex가 변경될 때마다 translateX를 이용해 슬라이드를 이동한다
  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currentIndex}00%)`;
    }
    console.log("슬라이드", currentIndex);
  }, [currentIndex]);

  // setTimeout의 지연 시간과 transition의 지속 시간이 정확히 일치하지 않을 수 있다
  // 이 둘의 시간이 정확히 일치하지 않으면, transition이 아직 끝나지 않은 상태에서 transition을 없애려고 하기 때문에 부자연스러운 화면 전환이 발생할 수 있다.
  // transitionend 이벤트를 사용하여 transition이 완전히 끝난 후에 transition을 없애고 슬라이드를 이동시키자.
  // transition의 지속 시간을 정확히 알 수 없어도 transition이 끝난 시점을 정확히 알 수 있으므로 부자연스러운 화면 전환이 없어질 것입니다.
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (carouselRef.current !== null) {
        if (currentIndex === images?.length + 1) {
          setCurrentIndex(1);
          carouselRef.current.style.transition = "";
        } else if (currentIndex === 0) {
          setCurrentIndex(images?.length);
          carouselRef.current.style.transition = "";
        }
      }
      setIsMoving(false); // 이동 완료
    };

    if (carouselRef.current !== null) {
      carouselRef.current.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (carouselRef.current !== null) {
        carouselRef.current.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [currentIndex, images]);

  // 이동할 방향(1이면 오른쪽으로, -1이면 왼쪽으로 이동)을 받아 해당 슬라이드로 이동시켜준다.
  const handleSwipe = (direction: number) => {
    // 슬라이드가 이동하는 동안에는 handleSwipe 함수가 작동하지 않도록 하여
    // 슬라이드가 완전히 이동하기 전에 인덱스가 추가로 변경되는 것을 방지합니다.
    // 사용자가 버튼을 빠르게 여러 번 클릭하더라도 인덱스가 배열 크기를 벗어나지 않게 됩니다.
    if (isMoving) return; // 이미 이동 중이면 함수 종료
    setIsMoving(true); // 이동 시작

    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = "all 0.5s ease-in-out";
    }

    setCurrentIndex(prev => prev + direction);
    console.log("스와이프", currentIndex);
  };

  return (
    <CarouselWrapper>
      <ArrowButtonPrev
        onClick={() => {
          handleSwipe(-1);
        }}
      />
      <FrameContainerWrapper>
        <FrameCurationWrapper>
          <CurationImageContainerWrapper ref={carouselRef}>
            {currentImages?.map((image, index) => {
              const key = `${image}-${index}`;

              return (
                <CurationImageWrapper key={key}>
                  <CurationImage src={image} />
                </CurationImageWrapper>
              );
            })}
          </CurationImageContainerWrapper>
          <CurationTextWrapper>고령도 유튜브, 카톡 잘 써요" …치매엔 어떤 영향?</CurationTextWrapper>
          <DotWrapper>
            {images.map((dot, index) => {
              return (
                <Dot
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index + 1);
                  }}
                />
              );
            })}
          </DotWrapper>
        </FrameCurationWrapper>
        <FrameOtherWrapper>
          <FrameMzWrapper>
            <MzDictionaryWrapper>
              <MzDictionaryText>MZ 사전</MzDictionaryText>
            </MzDictionaryWrapper>
            <MzWordWrapper>
              <MzWordText>“ 알잘딱깔센 ”</MzWordText>
            </MzWordWrapper>
            <MzQuestionText>이 말의 뜻은?</MzQuestionText>
          </FrameMzWrapper>
          <FramePlace />
        </FrameOtherWrapper>
      </FrameContainerWrapper>
      <ArrowButtonNext
        onClick={() => {
          handleSwipe(1);
        }}
      />
    </CarouselWrapper>
  );
}

export default Carousel;
