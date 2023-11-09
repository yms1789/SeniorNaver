import { atom } from "recoil";

const workplaceState = atom({
  key: "workplace",
  default: "",
});

export default workplaceState;
