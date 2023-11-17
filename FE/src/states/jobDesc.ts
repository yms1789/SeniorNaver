import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const coordinateState = atom({
  key: "jobDesc",
  default: {
    acptMthd: "",
    deadline: "",
    emplymShpNm: "",
    jobId: "",
    jobclsNm: "",
    recrtTitle: "",
    workPlaceNm: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default coordinateState;
