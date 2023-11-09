import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IPlaceItem } from "../components/DrawerComponent";
import { CategoryGroupCode, placeholderImage } from "../utils/utils";

export type User = {
  firstName: string;
  lastName: string;
};

export type UsersPage = {
  results: User[];
  next: number | undefined;
};
export interface IPlace {
  meta: {
    totalPage: number;
    pageable_count: number;
  };
  documents: IPlaceItem[];
}

const fetchCategory = async (page: number, category: string = "맛집", lat: string, lng: string) => {
  try {
    const response = await axios.get<IPlace>(`/api/search/v1/category`, {
      params: {
        page,
        category: CategoryGroupCode[category],
        x: lng,
        y: lat,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.errorCode === "SE01") {
        window.alert("검색어를 입력해주세요");
      }
      throw new Error(error.response?.data);
    }
  }
};

export const fetchSearch = async (page: number, query: string, lat: string, lng: string) => {
  if (!query) {
    return;
  }
  try {
    const response = await axios.get<IPlace>(`/api/search/v1/keyword`, {
      params: {
        page,
        keyword: query,
        x: lng,
        y: lat,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.errorCode === "SE01") {
        window.alert("검색어를 입력해주세요");
      }
      throw new Error(error.response?.data);
    }
  }
};

export const useCategoryQuery = (category: string, lat: string, lng: string) => {
  const query = useInfiniteQuery({
    queryKey: ["category", category],
    queryFn: ({ pageParam = 1 }) => fetchCategory(pageParam, category, lat, lng),
    getNextPageParam: (lastPage, allPages) => {
      return allPages?.length < lastPage?.meta.totalPage! ? allPages.length + 1 : undefined;
    },

    suspense: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
