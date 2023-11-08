import { useQuery } from "@tanstack/react-query";
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
interface IPlace {
  meta: {
    totalPage: number;
    pageable_count: number;
  };
  documents: IPlaceItem[];
}

const fetchCategory = async (category: string = "맛집", lat: string, lng: string) => {
  try {
    const response = await axios.get(`/api/search/v1/category`, {
      params: {
        page: 1,
        category: CategoryGroupCode[category],
        x: lng,
        y: lat,
      },
    });

    return response.data.documents;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.errorCode === "SE01") {
        window.alert("검색어를 입력해주세요");
      }
      throw new Error(error.response?.data);
    }
  }
};

export const fetchSearch = async (query: string, lat: string, lng: string) => {
  if (!query) {
    return;
  }
  try {
    const response = await axios.get<IPlace>(`/api/search/v1/keyword`, {
      params: {
        page: 1,
        keyword: query,
        x: lng,
        y: lat,
      },
    });
    response.data.documents.map((fetchItem: IPlaceItem) => {
      if (!fetchItem.thumbnail.length) {
        fetchItem.thumbnail = placeholderImage(200);
      }
    });
    return response.data.documents;
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
  const query = useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchCategory(category, lat, lng),
    suspense: false,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useSearchQuery = (search: string, lat: string, lng: string) => {
  const query = useQuery({
    queryKey: ["search"],
    queryFn: () => fetchSearch(search, lat, lng),
    suspense: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return query;
};
