import defaultimage from "../assets/images/defaultimage.png";
import fetchApi from "../states/fetchApi";

const placeholderImage = (number: number) => {
  return `https://picsum.photos/1920/1000/?image=${number}`;
};
export const CategoryGroupCode: {
  [key: string]: string;
} = { 맛집: "FD6", 병원: "HP8", 관광지: "AT4" };

const getDateDiff = (d1: string) => {
  const date1 = new Date(d1);
  const today = new Date();

  const diffDate = date1.getTime() - today.getTime();
  const day = Math.floor(diffDate / (1000 * 60 * 60 * 24)) + 1;
  console.log(day);
  return day < 0 ? "마감" : "D - " + day;
};

export { placeholderImage, getDateDiff };
export const curationCategory = ["공연", "관광", "뉴스", "맛집"];

export const curationIcon: [number, string][] = [
  [
    4,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Musical%20Note.png",
  ],
  [
    5,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Camping.png",
  ],
  [
    4,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Newspaper.png",
  ],
  [
    5,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cut%20of%20Meat.png",
  ],
];

export const showGenre = [
  "전체",
  "클래식",
  "뮤지컬",
  "국악",
  "대중음악",
  "연극",
  "서커스마술",
  "무용",
];

export const travelLocation = [
  "서울",
  "경기",
  "강원",
  "인천",
  "세종",
  "광주",
  "대전",
  "충북",
  "충남",
  "전북",
  "전남",
  "대구",
  "경북",
  "경남",
  "부산",
  "울산",
  "제주",
];

interface TCityCodes {
  [key: string]: number;
}

export const cityCodes: TCityCodes = {
  서울: 1,
  인천: 2,
  대전: 3,
  대구: 4,
  광주: 5,
  부산: 6,
  울산: 7,
  세종: 8,
  경기: 31,
  강원: 32,
  충북: 33,
  충남: 34,
  경북: 35,
  경남: 36,
  전북: 37,
  전남: 38,
  제주: 39,
};

export const initSelectedCategory = <T extends { [key: string]: boolean }>(
  categories: string[],
  defaultCategory: string,
): T => {
  let initialCategory = {} as T; // 호출될때 실제 타입이 결정되는 제너릭 타입 매개변수

  categories.forEach((curr: string) => {
    (initialCategory as { [key: string]: boolean })[curr] = curr === defaultCategory;
  });

  return initialCategory;
};

interface ThandleSelect {
  (
    mode: number,
    value: string,
    setSelectedCategory: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    initialSelectedCategory: Record<string, boolean>, // 모든 속성의 키가 K이고 값이 T인 타입을 생성
  ): void;
}

export const handleSelect: ThandleSelect = (
  mode,
  value,
  setSelectedCategory,
  initialSelectedCategory,
) => {
  setSelectedCategory(prev => {
    let newCategory: Record<string, boolean> = initialSelectedCategory;
    if (mode === 1) {
      const first = Object.keys(initialSelectedCategory)[0];
      if (first === "서울") {
        if (value === "서울") {
          newCategory = initialSelectedCategory;
        } else {
          newCategory = { ...initialSelectedCategory, 서울: false, [value]: !prev[value] };
        }
      } else if (first === "전체") {
        if (value === "전체") {
          newCategory = initialSelectedCategory;
        } else {
          newCategory = { ...initialSelectedCategory, 전체: false, [value]: !prev[value] };
        }
      }
    } else if (mode === 2) {
      if (value === "전체") {
        newCategory = initialSelectedCategory;
      } else if (prev[value]) {
        newCategory = { ...prev, [value]: false };
      } else {
        newCategory = { ...prev, [value]: true, 전체: false };
      }
    } else {
      newCategory = initialSelectedCategory;
    }
    if (!Object.values(newCategory).some(Boolean)) {
      newCategory = initialSelectedCategory;
    }
    return newCategory;
  });
};

export const onErrorImg: React.ReactEventHandler<HTMLImageElement> = e => {
  const target = e.target as HTMLImageElement;
  target.src = defaultimage;
};

export const fetchUserDatas = async () => {
  try {
    const response = await fetchApi.get("/api/profile/myProfile");
    return response.data.region;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
