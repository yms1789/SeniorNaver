import { atom } from "recoil";
import axios from "axios";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface IMemeCurrentTap {
  currentPage: number;
}
export const memeCurrentTapState = atom<IMemeCurrentTap>({
  key: "memeCurrentTap",
  default: {
    currentPage: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
