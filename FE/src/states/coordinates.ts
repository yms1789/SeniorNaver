import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const coordinateState = atom({
  key: "coordinate",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default coordinateState;
