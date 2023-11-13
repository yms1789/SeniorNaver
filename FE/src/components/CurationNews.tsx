import { useEffect, useState } from "react";
import axios from "axios";
import { handleSelect, initSelectedCategory } from "../utils/utils";
import { useRecoilState } from "recoil";
import { newsCategoryState } from "../states/curationCategory";
import RoundedButton from "./RoundedButton";
import { styled } from "styled-components";

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
  /* background-color: #35a62b; */
  grid-template-columns: repeat(2, 38vw);
  gap: 2vw;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 25vw);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 40vw);
  }
`;
const DataNewsWrapper = styled.div`
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
  background-color: var(--aqua01);
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.05;
    background-color: var(--aqua);
  }
`;
const NewsTitleWrapper = styled.div`
  height: 5vw;
  font-size: 1.7vw;
`;
const NewsImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const NewsImage = styled.img`
  flex-shrink: 0;
  height: 20vw;
  width: 100%;
  object-fit: cover;
`;

interface TNewsData {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl: string;
}

interface TSelectedNewsCategory {
  [key: string]: boolean;
  속보: boolean;
  정치: boolean;
  경제: boolean;
  스포츠: boolean;
  연예: boolean;
  지역: boolean;
}

function CurationNews() {
  const [keywords, setKeywords] = useState(["속보", "정치", "경제", "스포츠", "연예", "지역"]);

  const initialSelectedCategory = initSelectedCategory<TSelectedNewsCategory>(keywords, "속보");

  const [dataNews, setDataNews] = useState<TNewsData[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<TSelectedNewsCategory>(newsCategoryState);

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    const sendBE = Object.keys(selectedCategory).filter(key => selectedCategory[key] === true);
    try {
      if (sendBE[0] === "속보") {
        sendBE[0] = "뉴스";
      }
      const response = await axios.get(`/api/curation/v1/news/${sendBE[0]}`);
      setDataNews(response.data);
      console.log("뉴스 데이터", dataNews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurationNewsWrapper>
      <NewsCategoryWrapper>
        {keywords.map(keyword => {
          const uuid = self.crypto.randomUUID();
          return (
            <RoundedButton
              key={uuid}
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
      <NewsGridWrapper>
        {dataNews.map(news => {
          return (
            <DataNewsWrapper key={news.title} onClick={() => window.open(news.link, "_blank")}>
              <NewsTitleWrapper>{news.title}</NewsTitleWrapper>
              <NewsImageWrapper>
                <NewsImage src={news.imageUrl} />
              </NewsImageWrapper>
              <div>{news.pubDate.slice(0, 16)}</div>
            </DataNewsWrapper>
          );
        })}
      </NewsGridWrapper>
    </CurationNewsWrapper>
  );
}

export default CurationNews;
