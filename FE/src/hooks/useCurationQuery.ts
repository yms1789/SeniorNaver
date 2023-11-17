import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import {
  newsCategoryState,
  showCategoryState,
  travelCategoryState,
} from "../states/curationCategory";
import {
  TCarouselData,
  TSelectedNewsCategory,
  TSelectedShowCategory,
  TSelectedTravelCategory,
  TTravelData,
} from "../utils/types";
import { cityCodes, fetchUserDatas } from "../utils/utils";
import { fetchApi } from "../states/useAxiosInterceptor";

export const useCurationCarouselQuery = () => {
  const fetchData = async () => {
    try {
      const response = await fetchApi.get<TCarouselData>("api/curation/v1/carousel");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch carousel data");
    }
  };
  const curationCarouselQuery = useQuery(["carousel"], fetchData, {
    refetchOnWindowFocus: false,
  });
  return curationCarouselQuery;
};

export const useCurationShowsQuery = () => {
  const selectedCategory = useRecoilValue<TSelectedShowCategory>(showCategoryState);
  const fetchShows = async () => {
    try {
      const response = await axios.get("/api/curation/v1/performance");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch shows data");
    }
  };
  const curationShowsQuery = useQuery(["shows", selectedCategory], () => fetchShows(), {
    refetchOnWindowFocus: false,
  });
  return curationShowsQuery;
};

export const useCurationTravelsQuery = () => {
  const selectedCategory = useRecoilValue<TSelectedTravelCategory>(travelCategoryState);
  const fetchTravels = async (code: string) => {
    const sendBE = cityCodes[code] || 1;
    try {
      const response = await axios.get(`/api/curation/v1/tourdt/${sendBE}`);
      const data = response.data.map((travel: TTravelData) => ({
        ...travel,
        hovered: false,
      }));
      return data;
    } catch (error) {
      throw new Error("Failed to fetch travels data");
    }
  };
  const curationTravelsQuery = useQuery(["travels", selectedCategory], () =>
    fetchTravels(Object.keys(selectedCategory).filter(key => selectedCategory[key])[0]), {
      refetchOnWindowFocus: false,
    }
  );
  return curationTravelsQuery;
};

export const useCurationNewsQuery = () => {
  const selectedCategory = useRecoilValue<TSelectedNewsCategory>(newsCategoryState);
  const fetchNews = async (category: string) => {
    if (category === "전체") {
      category = "뉴스";
    }
    if (category === "지역") {
      try {
        category = await fetchUserDatas();
      } catch (error) {
        category = "지역";
      }
    }
    try {
      const response = await axios.get(`/api/curation/v1/news/${category}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch news data");
    }
  };
  const curationNewsQuery = useQuery(["news", selectedCategory], () =>
    fetchNews(Object.keys(selectedCategory).filter(key => selectedCategory[key])[0]), {
      refetchOnWindowFocus: false,
    }
  );
  return curationNewsQuery;
};
