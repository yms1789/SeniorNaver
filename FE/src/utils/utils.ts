export const placeholderImage = (number: number) => {
  return `https://picsum.photos/1920/1000/?image=${number}`;
};

export const curationCategory = ["뉴스", "공연", "맛집", "관광"];

export const curationIcon: [number, string][] = [
  [
    4,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Newspaper.png",
  ],
  [
    4,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Musical%20Note.png",
  ],
  [
    5,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cut%20of%20Meat.png",
  ],
  [
    5,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Camping.png",
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
  "전체",
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
    let newCategory;
    if (mode === 1) {
      if (value === "전체") {
        newCategory = initialSelectedCategory;
      } else {
        newCategory = { ...initialSelectedCategory, 전체: false, [value]: !prev[value] };
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
