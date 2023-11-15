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
import { cityCodes } from "../utils/utils";

export const useCurationCarouselQuery = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get<TCarouselData>("api/curation/v1/carousel");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch carousel data");
    }
  };

  const curationCarouselQuery = useQuery<TCarouselData, Error>(["carousel"], fetchData, {
    staleTime: 300000, // 5분 동안 캐시 유지
  });

  return curationCarouselQuery;
};

export const useCurationNewsQuery = () => {
  const selectedCategory = useRecoilValue<TSelectedNewsCategory>(newsCategoryState);

  const fetchNews = async (category: string) => {
    if (category === "속보") {
      category = "뉴스";
    }
    const response = await axios.get(`/api/curation/v1/news/${category}`);
    return response.data;
  };

  const curationNewsQuery = useQuery(["news", selectedCategory], () =>
    fetchNews(Object.keys(selectedCategory).filter(key => selectedCategory[key])[0]),
  );

  return curationNewsQuery;
};

export const useCurationShowsQuery = () => {
  const selectedCategory = useRecoilValue<TSelectedShowCategory>(showCategoryState);

  const fetchShows = async () => {
    const response = await axios.get("/api/curation/v1/performance");
    return response.data;
  };

  const curationShowsQuery = useQuery(["shows", selectedCategory], () => fetchShows());

  return curationShowsQuery;
};

export const useCurationTravelsQuery = () => {
  const selectedCategory = useRecoilValue<TSelectedTravelCategory>(travelCategoryState);

  const fetchTravels = async (code: string) => {
    const sendBE = cityCodes[code] || 1;
    const response = await axios.get(`/api/curation/v1/tourdt/${sendBE}`);
    const data = response.data.map((travel: TTravelData) => ({
      ...travel,
      hovered: false,
    }));
    return data;
  };

  const curationTravelsQuery = useQuery(["travels", selectedCategory], () =>
    fetchTravels(Object.keys(selectedCategory).filter(key => selectedCategory[key])[0]),
  );
  return curationTravelsQuery;
};
