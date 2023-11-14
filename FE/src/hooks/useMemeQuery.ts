import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import fetchApi from "../states/fetchApi";
export interface IWords {
  page: number;
  keyword: string;
  totalPage: number;
}

// 전체 단어 조회 (페이지네이션)
export async function fetchWords(pageNum: number, input: string) {
  try {
    const response = await axios.get<IWords>("/api/dictionary/v1/word/list", {
      params: {
        page: pageNum,
        keyword: input,
      },
    });
    console.log("단어", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

// 출제가 가능한 단어인지 검사
export async function validWord(word: string) {
  try {
    const response = await fetchApi.post(`/api/problem/valid/${word}`);
    console.log("단어 사용 가능!", response.data);
    return true;
  } catch (error) {
    console.log("단어 검사 실패");
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    return false;
  }
}

// 문제 출제
export async function postProblem(newProblem: object) {
  try {
    const response = await fetchApi.post("/api/problem/register", newProblem);
    console.log("문제등록 성공", response.data);
    return response.data;
  } catch (error) {
    console.log("문제등록 실패");
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

export const useWordsQuery = (place: string, input?: string) => {
  const query = useInfiniteQuery({
    queryKey: ["words", place],
    queryFn: ({ pageParam = 0 }) => fetchWords(pageParam, input || ""),
    getNextPageParam: lastPage => {
      return lastPage?.page! < lastPage?.totalPage! ? lastPage?.page! + 1 : undefined;
    },
    suspense: true,
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  });

  return query;
};
