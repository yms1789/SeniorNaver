import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const coordinateState = atom({
  key: "coordinate",
  default: {
    mapx: "",
    mapy: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default coordinateState;
