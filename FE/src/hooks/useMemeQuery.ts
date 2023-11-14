import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import fetchApi from "../states/fetchApi";
export interface IWords {
  page: number;
  keyword: string;
  totalPage: number;
}

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

export async function postProblem(newProblem: object) {
  console.log("헤더헤더헤더: ", fetchApi.defaults.headers.common); // 요청 전 토큰 출력
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
