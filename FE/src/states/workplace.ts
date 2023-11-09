import { atom } from "recoil";

const workplaceState = atom({
  key: "coordinate",
  default: "",
});

export default workplaceState;
