import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchApi } from "../states/useAxiosInterceptor";
import Swal from "sweetalert2";
export interface IWords {
  page: number;
  keyword: string;
  year: number;
}

// 오늘의 단어 조회
export async function fetchTodayWord() {
  try {
    const response = await fetchApi.get("/api/dictionary/v1/today/word");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

//  단어 디테일 조회
export async function fetchDetail(wordId: number) {
  try {
    const response = await fetchApi.get(`/api/dictionary/v1/word/${wordId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}
//  단어 스크랩
export async function scrapWord(wordId: number) {
  try {
    const response = await fetchApi.post(`/api/dictionary/word/scrap/${wordId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}
//  단어 스크랩 취소
export async function deleteScrapWord(wordId: number) {
  try {
    const response = await fetchApi.delete(`/api/dictionary/word/cancel/${wordId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}
// 전체 단어 조회 (페이지네이션)
export async function fetchWords(pageNum: number, input: string, yearinput: number) {
  try {
    const response = await fetchApi.post("/api/dictionary/v1/word/list", {
      page: pageNum,
      keyword: input,
      year: yearinput,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

// 저장한 단어 조회 (페이지네이션)
export async function fetchMyWords(pageNum: number, category: number) {
  try {
    const response = await fetchApi.post("/api/voca/list", {
      page: pageNum,
      category: category,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}
// 출제가 가능한 단어인지 검사
export async function validWord(word: string, year: number) {
  try {
    const response = await fetchApi.post(`/api/problem/valid/${word}/${year}`);
    return true;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "해당 연도에 없는 단어 입니다.",

      showConfirmButton: false,
      timer: 1500,
      background: "var(--white)",
      color: "var(--dark01)",
      width: "500px",
    });
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

// 연도별 랜덤 문제 불러오기
export async function fetchRandomProblem(year: number) {
  try {
    const response = await fetchApi.get(`/api/problem/v1/random/${year}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

// 문제 디테일 조회
export async function fetchProblemDetail(problemId: number) {
  try {
    const response = await fetchApi.get(`/api/problem/v1/detail/${problemId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}

// 개별 문제 저장
export async function postResult(problemId: string, title: string, answer: number, choice: number) {
  try {
    const response = await fetchApi.post(`/api/problem/register/result`, {
      problemId: problemId,
      title: title,
      answer: answer,
      choice: choice,
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    return false;
  }
}

// 최종 문제 저장
export async function postTotalResult() {
  try {
    const response = await fetchApi.post(`/api/problem/total/result`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
}
