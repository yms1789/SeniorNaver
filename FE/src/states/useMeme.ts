import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface IMemeCurrentTap {
  currentPage: number;
}
interface IMemeMineCurrentPracticePage {
  currentPage: number;
  currentYear: number;
}

interface IMemeMineCurrentCategory {
  currentCategory: number;
}

export const memeCurrentTapState = atom<IMemeCurrentTap>({
  key: "memeCurrentTap",
  default: {
    currentPage: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const memeMineCurrentCategoryState = atom<IMemeMineCurrentCategory>({
  key: "memeMineCurrentCategory",
  default: {
    currentCategory: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const memeMineCurrentPracticeState = atom<IMemeMineCurrentPracticePage>({
  key: "memeMineCurrentPracticePage",
  default: {
    currentPage: 0,
    currentYear: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const memeMineCurrentWordDetailState = atom({
  key: "memeMineCurrentWordDetail",
  default: {
    currentWord: 0,
  },
  effects_UNSTABLE: [persistAtom],
});


export const memeFinalResult = atom({
  key: "memeMineCurrentWordDetail",
  default: {
    problemList: [
      {
        id: 0,
        title: "",
        choice: 0,
        answer: true,
      },
    ],
  },
});
