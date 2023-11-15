import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { newsCategoryState } from "../states/curationCategory";
import { useCurationNewsQuery } from "../hooks/useCurationQuery";
import { TSelectedNewsCategory } from "../utils/types";
import { handleSelect, initSelectedCategory, onErrorImg } from "../utils/utils";
import LoadingForCuration from "./LoadingForCuration";
import RoundedButton from "./RoundedButton";
import { upButtonState } from "../states/upButton";

const CurationNewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vw;
`;
const NewsCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;
const NewsGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 38vw);
  gap: 2vw;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 46vw);
  }
`;
const DataNewsWrapper = styled.a`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  align-self: center;
  justify-content: center;
  padding: 1.1vw;
  gap: 0.7vw;
  color: var(--dark02);
  background-color: var(--aqua01);
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.05;
    background-color: var(--aqua);
  }
`;
const NewsTitleWrapper = styled.div`
  height: 5vw;
  font-size: 1.6vw;
  color: var(--dark02);
  @media (max-width: 1280px) {
    height: 6vw;
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    height: 8vw;
    font-size: 2.5vw;
  }
`;
const NewsImageWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const NewsImage = styled.img`
  flex-shrink: 0;
  height: 22vw;
  width: 100%;
  object-fit: cover;
`;
const NewsDateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 1vw;
`;
const BottomBoundaryRef = styled.div`
  height: 1px;
`;

interface TNewsData {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl: string;
}

function CurationNews() {
  const [keywords, _] = useState(["속보", "정치", "경제", "스포츠", "연예", "지역"]);

  const initialSelectedCategory = initSelectedCategory<TSelectedNewsCategory>(keywords, "속보");
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<TSelectedNewsCategory>(newsCategoryState);
  const [__, setUpButton] = useRecoilState(upButtonState);

  const [dataNews, setDataNews] = useState<TNewsData[]>([]);
  const [visibleData, setVisibleData] = useState<TNewsData[]>([]); // 화면에 보여줄 데이터를 저장할 상태
  const [page, setPage] = useState(0); // 현재 페이지를 저장할 상태
  const [changeCategory, setChangeCategory] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);

  const { data: newsData, isLoading } = useCurationNewsQuery();

  useEffect(() => {
    if (newsData) {
      setDataNews(newsData);
    }
  }, [newsData]);

  useEffect(() => {
    if (page > 0) {
      setUpButton(true);
    }
  }, [page]);

  useEffect(() => {
    setVisibleData(dataNews.slice(0, (page === 0 ? 1 : page) * 10));
  }, [dataNews, page]);

  useEffect(() => {
    setChangeCategory(true);
    if (changeCategory) {
      setDataNews([]);
      setPage(0);
    }
    setChangeCategory(false);
  }, [selectedCategory]);

  useEffect(() => {
    // Intersection Observer를 초기화합니다.
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (bottomBoundaryRef.current) {
      observer.current.observe(bottomBoundaryRef.current);
    }
    return () => {
      if (bottomBoundaryRef.current && observer.current) {
        observer.current.unobserve(bottomBoundaryRef.current);
      }
    };
  }, []);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 1); // 페이지를 증가시켜 추가 데이터를 화면에 보여줍니다.
    }
  };

  return (
    <CurationNewsWrapper>
      <NewsCategoryWrapper>
        {keywords.map(keyword => {
          return (
            <RoundedButton
              key={self.crypto.randomUUID()}
              buttonText={keyword}
              isActive={selectedCategory[keyword]}
              onClick={() =>
                handleSelect(
                  1,
                  keyword,
                  setSelectedCategory as React.Dispatch<
                    React.SetStateAction<Record<string, boolean>>
                  >,
                  initialSelectedCategory,
                )
              }
            />
          );
        })}
      </NewsCategoryWrapper>
      {!isLoading ? (
        <NewsGridWrapper>
          {visibleData.map(news => {
            return (
              <DataNewsWrapper
                key={self.crypto.randomUUID()}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewsTitleWrapper>{news.title}</NewsTitleWrapper>
                <NewsImageWrapper>
                  <NewsImage
                    src={news.imageUrl}
                    alt="NewsImage"
                    onError={onErrorImg}
                    referrerPolicy="no-referrer"
                  />
                </NewsImageWrapper>
                <NewsDateWrapper>{news.pubDate.slice(0, 16)}</NewsDateWrapper>
              </DataNewsWrapper>
            );
          })}
        </NewsGridWrapper>
      ) : (
        <LoadingForCuration />
      )}
      <BottomBoundaryRef ref={bottomBoundaryRef} />
    </CurationNewsWrapper>
  );
}

export default CurationNews;
