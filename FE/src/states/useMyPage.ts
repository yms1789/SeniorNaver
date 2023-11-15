import { atom } from "recoil";
interface IMemeMineCurrentCategory {
  currentCategory: number;
}

export const myPageCategoryState = atom<IMemeMineCurrentCategory>({
  key: "myPageCategoryState",
  default: {
    currentCategory: 0,
  },
});
