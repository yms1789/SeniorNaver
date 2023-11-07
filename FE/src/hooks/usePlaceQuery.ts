import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IPlaceItem } from "../components/DrawerComponent";
import { placeholderImage } from "../utils/utils";

export type User = {
  firstName: string;
  lastName: string;
};

export type UsersPage = {
  results: User[];
  next: number | undefined;
};
interface IPlace {
  items: IPlaceItem[];
}

const fetchCategory = async (category: string = "맛집", location = "경북 구미시 진평동") => {
  try {
    const response = await axios.get(`/api/search/v1/category`, {
      params: {
        location: location,
        category,
      },
    });

    // const match = /src=([^&]+)/.exec(fetchItem.thumbnail);
    response.data.items.map((fetchItem: IPlaceItem) => {
      if (!fetchItem.thumbnail.length) {
        fetchItem.thumbnail = placeholderImage(200);
      }
    });
    console.log(response.data.items);

    return response.data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.errorCode === "SE01") {
        window.alert("검색어를 입력해주세요");
      }
      throw new Error(error.response?.data);
    }
  }
};

export const fetchSearch = async (query: string) => {
  if (!query) {
    return;
  }
  try {
    const response = await axios.get<IPlace>(`/api/search/v1/keyword`, {
      params: {
        keyword: query,
      },
    });
    response.data.items.map((fetchItem: IPlaceItem) => {
      if (!fetchItem.thumbnail.length) {
        fetchItem.thumbnail = placeholderImage(200);
      }
    });
    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.errorCode === "SE01") {
        window.alert("검색어를 입력해주세요");
      }
      throw new Error(error.response?.data);
    }
  }
};

export const useCategoryQuery = (category: string, location?: string) => {
  const query = useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchCategory(category, location),
    suspense: false,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useSearchQuery = (search: string) => {
  const query = useQuery({
    queryKey: ["search"],
    queryFn: () => fetchSearch(search),
    suspense: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return query;
};
