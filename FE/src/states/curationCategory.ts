import { atom } from "recoil";

export const curationCategoryState = atom({
  key: "curationCategoryState",
  default: "공연",
});

export const showCategoryState = atom({
  key: "showCategoryState",
  default: {
    전체: true,
    클래식: false,
    뮤지컬: false,
    국악: false,
    대중음악: false,
    연극: false,
    서커스마술: false,
    무용: false,
  },
});

export const travelCategoryState = atom({
  key: "travelCategoryState",
  default: {
    서울: true,
    경기: false,
    강원: false,
    인천: false,
    세종: false,
    광주: false,
    대전: false,
    충북: false,
    충남: false,
    전북: false,
    전남: false,
    대구: false,
    경북: false,
    부산: false,
    울산: false,
    경남: false,
    제주: false,
  },
});

export const newsCategoryState = atom({
  key: "newsCategoryState",
  default: {
    속보: true,
    정치: false,
    경제: false,
    스포츠: false,
    연예: false,
    지역: false,
  },
});
