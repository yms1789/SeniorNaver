export interface TCarouselData {
  curations: { imageUrl: string; link: string; title: string }[];
  mzWords: { word: string; wordId: number }[];
  places: {
    firstimage: string;
    addr1: string;
    title: string;
    contentid: string;
  }[];
}

export interface TSelectedNewsCategory {
  [key: string]: boolean;
  전체: boolean;
  정치: boolean;
  경제: boolean;
  부동산: boolean;
  주식: boolean;
  건강: boolean;
  스포츠: boolean;
  연예: boolean;
  지역: boolean;
}

export interface TSelectedShowCategory {
  [key: string]: boolean;
  전체: boolean;
  클래식: boolean;
  뮤지컬: boolean;
  국악: boolean;
  대중음악: boolean;
  연극: boolean;
  서커스마술: boolean;
  무용: boolean;
}

export interface TSelectedTravelCategory {
  [key: string]: boolean;
  서울: boolean;
  경기: boolean;
  강원: boolean;
  인천: boolean;
  세종: boolean;
  광주: boolean;
  대전: boolean;
  충북: boolean;
  충남: boolean;
  전북: boolean;
  전남: boolean;
  대구: boolean;
  경북: boolean;
  부산: boolean;
  울산: boolean;
  경남: boolean;
  제주: boolean;
}

export interface TTravelData {
  addr1: string;
  addr2: string;
  createdtime: string;
  contentid: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  modifiedtime: string;
  title: string;
  hovered?: boolean;
}

export interface TDataTravelDetail {
  contentid: string;
  title: string;
  createdtime: string;
  modifiedtime: string;
  tel: string;
  telname: string;
  homepage: string;
  firstimage: string;
  firstimage2: string;
  areacode: string;
  sigungucode: string;
  addr1: string;
  addr2: string;
  zipcode: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  overview: string;
}
