import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import MemeDictionaryMineSavedWordsList from "./MemeDictionaryMineSavedWordsList";
import { memeMineCurrentCategoryState } from "../states/useMeme";
import minebackground from "./../assets/images/minebackground.png";
import { useState, useEffect } from "react";
import { fetchMyWords } from "../hooks/useMemeQuery";
import Pagination from "./Pagination";

const MemeDictionaryMineWraaper = styled.div`
  margin-top: 50px;
  width: 930px;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 300px;
`;

const SavedWordsHeader = styled.div`
  margin-top: 150px;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 60px;
  text-align: center;
  margin-bottom: 10px;
  user-select: none;
`;
const SavedWordsHeadline = styled.div`
  width: 850px;
  border: 1px solid var(--dark01);
`;
const SavedWordsListArea = styled.div`
  margin-top: 200px;
  width: 900px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MemeDictionaryMineRowWraaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PaginationWrapper = styled.div`
  margin-top: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MemeDictionaryMineSavedWords() {
  const [posts, setPosts] = useState([]);
  const [year, setYear] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchvalue, setSearchvalue] = useState("");

  const fetchData = async () => {
    const data = await fetchMyWords(currentPage - 1, 1);
    setPosts(data.items);
    setTotalPages(data.totalPage);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchvalue, year]);

  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  return (
    <MemeDictionaryMineWraaper>
      <SavedWordsHeader>저장한 단어</SavedWordsHeader>
      <SavedWordsHeadline />
      <MemeDictionaryMineRowWraaper>
        <SavedWordsListArea>
          {posts && <MemeDictionaryMineSavedWordsList currentPosts={posts} />}
        </SavedWordsListArea>
        <PaginationWrapper>
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </PaginationWrapper>
      </MemeDictionaryMineRowWraaper>
    </MemeDictionaryMineWraaper>
  );
}

export default MemeDictionaryMineSavedWords;
