import { styled } from "styled-components";
import LoadingForCuration from "./LoadingForCuration";

const CurationTastesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4vw;
`;

function CurationTastes() {
  return (
    <CurationTastesWrapper>
      <LoadingForCuration />
    </CurationTastesWrapper>
  );
}

export default CurationTastes;
